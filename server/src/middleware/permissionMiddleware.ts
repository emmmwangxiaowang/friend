import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * 权限中间件
 * 基于用户角色的访问控制（RBAC）
 */

/** 角色权限映射 - 定义每个角色可以访问的功能 */
const ROLE_PERMISSIONS = {
  USER: [
    'post:create',
    'post:read',
    'post:like',
    'comment:create',
    'comment:read',
    'discover:read',
    'profile:read',
    'profile:update',
    'chat:send',
    'greeting:send',
  ],
  VIP: [
    'post:create',
    'post:read',
    'post:like',
    'comment:create',
    'comment:read',
    'discover:read',
    'profile:read',
    'profile:update',
    'chat:send',
    'greeting:send',
    'discover:unlimited',    // VIP可以无限查看推荐
    'profile:superlike',     // VIP可以超级喜欢
    'chat:priority',         // VIP消息优先显示
  ],
  MODERATOR: [
    'post:create',
    'post:read',
    'post:like',
    'post:delete',           // 版主可以删除帖子
    'comment:create',
    'comment:read',
    'comment:delete',        // 版主可以删除评论
    'discover:read',
    'profile:read',
    'profile:update',
    'chat:send',
    'greeting:send',
    'discover:unlimited',
    'moderate:users',        // 版主可以管理用户
  ],
  ADMIN: ['*'],              // 管理员拥有所有权限
};

/** 检查用户是否拥有指定权限 */
export function hasPermission(userRole: string, permission: string): boolean {
  const permissions = ROLE_PERMISSIONS[userRole as keyof typeof ROLE_PERMISSIONS] || [];
  return permissions.includes('*') || permissions.includes(permission);
}

/**
 * 权限检查中间件
 * 使用方法: router.post('/api/posts', requireAuth, requirePermission('post:create'), handler)
 */
export function requirePermission(permission: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const user = await prisma.user.findUnique({
        where: { id: Number(userId) },
        select: { role: true },
      });

      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }

      if (!hasPermission(user.role, permission)) {
        return res.status(403).json({
          error: 'Forbidden',
          message: `需要权限: ${permission}`,
        });
      }

      next();
    } catch {
      return res.status(500).json({ error: 'Internal error' });
    }
  };
}

/**
 * 角色检查中间件
 * 使用方法: router.post('/api/admin', requireAuth, requireRole('ADMIN'), handler)
 */
export function requireRole(...roles: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const user = await prisma.user.findUnique({
        where: { id: Number(userId) },
        select: { role: true },
      });

      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }

      if (!roles.includes(user.role)) {
        return res.status(403).json({
          error: 'Forbidden',
          message: `需要角色: ${roles.join(' 或 ')}`,
        });
      }

      next();
    } catch {
      return res.status(500).json({ error: 'Internal error' });
    }
  };
}

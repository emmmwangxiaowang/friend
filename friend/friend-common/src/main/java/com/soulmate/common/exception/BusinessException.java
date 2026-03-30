package com.soulmate.common.exception;

import lombok.Getter;

/**
 * 业务异常类
 */
@Getter
public class BusinessException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    private final Integer code;

    public BusinessException(String message) {
        super(message);
        this.code = 500;
    }

    public BusinessException(Integer code, String message) {
        super(message);
        this.code = code;
    }

    public static BusinessException notFound(String resource) {
        return new BusinessException(404, resource + " not found");
    }

    public static BusinessException unauthorized() {
        return new BusinessException(401, "Unauthorized");
    }

    public static BusinessException forbidden() {
        return new BusinessException(403, "Forbidden");
    }
}

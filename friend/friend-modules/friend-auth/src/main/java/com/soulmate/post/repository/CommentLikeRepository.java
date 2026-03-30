package com.soulmate.post.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.soulmate.post.entity.Comment;
import com.soulmate.post.entity.CommentLike;
import com.soulmate.auth.entity.User;

public interface CommentLikeRepository extends JpaRepository<CommentLike, Long> {
    Optional<CommentLike> findByCommentAndUser(Comment comment, User user);
}

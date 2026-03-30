package com.soulmate.post.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.soulmate.post.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}

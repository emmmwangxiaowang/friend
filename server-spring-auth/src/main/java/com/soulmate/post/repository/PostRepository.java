package com.soulmate.post.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.soulmate.post.entity.Post;

public interface PostRepository extends JpaRepository<Post, Long> {
}

package com.soulmate.post.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.soulmate.post.entity.Post;
import com.soulmate.post.entity.PostLike;
import com.soulmate.auth.entity.User;

public interface PostLikeRepository extends JpaRepository<PostLike, Long> {
    Optional<PostLike> findByPostAndUser(Post post, User user);
}

package com.soulmate.post.controller;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.soulmate.auth.repository.UserRepository;
import com.soulmate.post.entity.Post;
import com.soulmate.post.entity.Comment;
import com.soulmate.post.service.PostService;
import com.soulmate.post.service.CommentService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/posts")
public class PostController {
    @Autowired private PostService postService;
    @Autowired private CommentService commentService;
    @Autowired private UserRepository userRepository;

    // DTOs (inner classes for quick wiring in this patch)
    public static class PostRequest {
        public Long userId;
        public String content;
    }

    public static class CommentRequest {
        public Long userId;
        public String content;
    }

    public static class PostResponse {
        public Long id;
        public Long authorId;
        public String authorUsername;
        public String content;
        public LocalDateTime createdAt;
        public Long likesCount;
        public Long commentsCount;
    }

    public static class CommentResponse {
        public Long id;
        public Long authorId;
        public String authorUsername;
        public String content;
        public LocalDateTime createdAt;
    }

    @GetMapping
    public ResponseEntity<List<PostResponse>> getAllPosts() {
        List<Post> posts = postService.findAll();
        List<PostResponse> resp = posts.stream().map(p -> {
            PostResponse r = new PostResponse();
            r.id = p.getId();
            r.authorId = p.getUser().getId();
            r.authorUsername = p.getUser().getUsername();
            r.content = p.getContent();
            r.createdAt = p.getCreatedAt();
            r.likesCount = (long) p.getLikes().size();
            r.commentsCount = (long) p.getComments().size();
            return r;
        }).collect(Collectors.toList());
        return ResponseEntity.ok(resp);
    }

    @PostMapping
    public ResponseEntity<PostResponse> createPost(@RequestBody @Valid PostRequest req) {
        Post p = postService.createPost(req.userId, req.content);
        PostResponse r = new PostResponse();
        r.id = p.getId();
        r.authorId = p.getUser().getId();
        r.authorUsername = p.getUser().getUsername();
        r.content = p.getContent();
        r.createdAt = p.getCreatedAt();
        r.likesCount = (long) p.getLikes().size();
        r.commentsCount = (long) p.getComments().size();
        return ResponseEntity.ok(r);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostResponse> getPost(@PathVariable Long id) {
        Post p = postService.findById(id).orElseThrow();
        PostResponse r = new PostResponse();
        r.id = p.getId();
        r.authorId = p.getUser().getId();
        r.authorUsername = p.getUser().getUsername();
        r.content = p.getContent();
        r.createdAt = p.getCreatedAt();
        r.likesCount = (long) p.getLikes().size();
        r.commentsCount = (long) p.getComments().size();
        return ResponseEntity.ok(r);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePost(@PathVariable Long id) {
        postService.deletePost(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<?> likePost(@PathVariable Long id, @RequestBody Long userId) {
        postService.likePost(id, userId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}/like")
    public ResponseEntity<?> unlikePost(@PathVariable Long id, @RequestBody Long userId) {
        postService.unlikePost(id, userId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/comments")
    public ResponseEntity<CommentResponse> addComment(@PathVariable Long id, @RequestBody @Valid CommentRequest req) {
        Comment c = commentService.addComment(id, req.userId, req.content);
        CommentResponse cr = new CommentResponse();
        cr.id = c.getId();
        cr.authorId = c.getUser().getId();
        cr.authorUsername = c.getUser().getUsername();
        cr.content = c.getContent();
        cr.createdAt = c.getCreatedAt();
        return ResponseEntity.ok(cr);
    }

    @GetMapping("/{id}/comments")
    public ResponseEntity<List<CommentResponse>> getComments(@PathVariable Long id) {
        List<Comment> comments = commentService.findByPost(id);
        List<CommentResponse> resp = comments.stream().map(c -> {
            CommentResponse cr = new CommentResponse();
            cr.id = c.getId();
            cr.authorId = c.getUser().getId();
            cr.authorUsername = c.getUser().getUsername();
            cr.content = c.getContent();
            cr.createdAt = c.getCreatedAt();
            return cr;
        }).collect(Collectors.toList());
        return ResponseEntity.ok(resp);
    }
}

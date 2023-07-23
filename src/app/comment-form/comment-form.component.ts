import { Router } from '@angular/router';
import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { Comment } from 'src/app/models/comment';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {

  comment: string = '';
  userId: number | undefined;
  flightId: number | undefined;
  newTag: string = '';
  tags: string[] = [];
  addedTags: string[] = [];

  addTag() {
    if (this.newTag.trim() !== '') {
      this.tags.push(this.newTag);
      this.addedTags.push(this.newTag);
      this.newTag = ''; 
    }
  }

  showCommentForm: Boolean = false;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {

  }
  onSubmit() {

    const comment: Comment = {
      comment: this.comment,
      userId: this.userId,
      flightId: this.flightId,
      tags: this.tags
    };

    this.apiService.postComment(comment).subscribe(data => {
      // alert("Comment added successfully");
      this.router.navigate([""]);
      this.comment = '';
      this.userId = undefined;
      this.flightId = undefined;
      this.tags = [];
      this.addedTags = [];
    });
  }
}

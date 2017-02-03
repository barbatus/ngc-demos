import {Component, Input, OnChanges} from '@angular/core';

import {MeteorReactive} from 'angular2-meteor';

import {ObservableCursor} from 'meteor-rxjs';

import {TodoTask} from 'tasks';

import {Tasks} from 'tasks';

import template from './task-list.component.html';

@Component({
  selector: 'task-list',
  template: template
})
export class TaskList extends MeteorReactive implements OnChanges {
  tasks: ObservableCursor<TodoTask>;
  @Input() hideCompleted: boolean = false;
  isLoading: boolean = false;

  constructor() {
    super();
    this.isLoading = true;
    this.subscribe('tasks.public', () => {
      this.isLoading = false;
    });
  }

  ngOnChanges(changes) {
    if ('hideCompleted' in changes) {
      this.tasks = this._getTasks(this.hideCompleted);
    }
  }

  _getTasks(hideCompleted) {
    if (hideCompleted) {
      return Tasks.find({
        checked: false
      });
    }
    return Tasks.find({});
  }
}

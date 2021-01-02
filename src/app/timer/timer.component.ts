import { Component, OnInit } from '@angular/core';
import { Timer } from './timer.model';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  timer: Timer;
  minutes;
  seconds;
  isFinished: Boolean;
  isStart: Boolean;
  isShortBreak: Boolean;
  isLongBreak: Boolean;
  isTimerMode: Boolean;
  interval;

  constructor() {
    this.timer = new Timer(7, 0, 5, 0, 10, 0, 2, true, true, true);
    this.minutes = this.timer.minutes;
    this.seconds = this.timer.seconds;
    this.isFinished = false;
    this.isStart = true;
    this.isTimerMode = true;
  }

  ngOnInit(): void {
  }

  start(): void {
    this.isStart = true;
    this.isFinished = false;
    this.interval = setInterval(() => {
      if (this.minutes == 0 && this.seconds == 0) {
        this.stop();
        this.check();
      }

      if (this.isStart) {
        if (this.seconds > 0) {
          this.seconds--;
        } else {
          this.minutes--;
          this.seconds = 59;
        }
      }
    }, 10);
  }

  pause(): void {
    clearInterval(this.interval);
  }

  stop(): void {
    this.pause();
    this.reset();
  }

  check(): void {
    if (this.isTimerMode) {
      this.timer.countLoop += 1;
      console.log("count loop : " + this.timer.countLoop);
      this.isTimerMode = false;

      if ((this.timer.countLoop % this.timer.longBreakInterval) != 0) {
        console.log("Short Break");
        this.isShortBreak = true;
      } else {
        console.log("Long Break");
        this.isLongBreak = true;
      }
    } else if (this.isShortBreak) {
      console.log("Timer Mode");
      this.isShortBreak = false;
      this.isTimerMode = true;
    } else if (this.isLongBreak) {
      this.isLongBreak = false;
      this.timer.countRound += 1;
      this.isTimerMode = true;

      if (!this.timer.isLoop) {
        this.isFinished = true;
      } else {
        console.log("Timer Loop");
      }
    }

    this.reset();

    if (this.timer.isAutoStartBreak &&
      (this.isShortBreak || this.isLongBreak)) {
      console.log("Auto Start Break");
      this.start();
    }
    if (this.timer.isAutoStartTimer && this.isTimerMode) {
      if ((this.timer.countLoop % this.timer.longBreakInterval) == 0) {
        if (this.timer.isLoop) {
          console.log("Auto Start loop timer");
          this.start();
        }
      } else {
        console.log("Auto Start Timer");
        this.start();
      }
    }
  }

  reset(): void {

    if (this.isTimerMode) {
      console.log("Reset Timer");
      this.minutes = this.timer.minutes;
      this.seconds = this.timer.seconds;
    } else if (this.isShortBreak) {
      console.log("Reset Short Break");
      this.minutes = this.timer.shortBreakMinutes;
      this.seconds = this.timer.shortBreakSeconds;
    } else if (this.isLongBreak) {
      console.log("Reset Long Break");
      this.minutes = this.timer.longBreakMinutes;
      this.seconds = this.timer.longBreakSeconds;
    }
  }

  resetAll(): void {
    this.stop();
    this.isTimerMode = true;
    this.isShortBreak = false;
    this.isLongBreak = false;
    this.timer.countRound = 0;
    this.timer.countLoop = 0;
    this.reset();
  }
}


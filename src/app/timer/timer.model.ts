export class Timer {
    public minutes;
    public seconds;
    public shortBreakMinutes;
    public shortBreakSeconds;
    public longBreakMinutes;
    public longBreakSeconds;
    public longBreakInterval;
    public countLoop;
    public countRound;
    public isLoop;
    public isAutoStartBreak;
    public isAutoStartTimer;

    constructor(minutes, seconds, shortBreakMinutes, shortBreakSeconds, 
        longBreakMinutes, longBreakSeconds, longBreakInterval, isAutoStartBreak, isAutoStartTimer, isLoop){
        this.minutes = minutes;
        this.seconds = seconds;
        this.shortBreakMinutes = shortBreakMinutes;
        this.shortBreakSeconds = shortBreakSeconds;
        this.longBreakMinutes = longBreakMinutes;
        this.longBreakSeconds = longBreakSeconds;
        this.longBreakInterval = longBreakInterval;
        this.isAutoStartBreak = isAutoStartBreak;
        this.isAutoStartTimer = isAutoStartTimer;
        this.isLoop = isLoop;
        this.countLoop = 0;
        this.countRound = 0;
    }
}
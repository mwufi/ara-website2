alright! so we have a todo list here. what i want to do is transform it into personal dashboard of productivity.


## Core principles

Simplicity & gamification

## Usage

The main activity is going to be working.

<CurrentTaskPomodoro/>
- if it's empty, then it's a textbox that says 'what do you want to work on?' <CurrentTaskInput/>
- otherwise, it displays a <PomodoroTimer/>
- it'll just read directly from InstantDB 
const { isLoading, error, data } = db.useQuery({ pomodoros: {} });

<Schedule>
- displays a little timeline of today (with filled-in segments when it's working), in a list fashion. the height of each segment will correspond to how long it was!
- default start time is 9am, default end time is 9pm
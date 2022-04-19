interface CalendarEventDetailBase {
    id: string;
    userId: string;
    name: string;
    memo: string | null;
    shared: boolean;
}

export interface CalendarEventDetail extends CalendarEventDetailBase {
    start: string;
    end: string | null;
}

export interface CalendarTodayEventDetail extends CalendarEventDetailBase {
    startTime: string | null;
    endTime: string | null;    
}

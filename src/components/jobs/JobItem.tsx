import React from "react"
import './JobItem.css';
import { Contact, Job } from "../../common/types";
import moment from 'moment';
import { isEmpty } from "lodash";

export interface JobItemProps {
    item: (Pick<Job, 'id' | 'name' | 'start' | 'end' | 'location'>) & { contact?: Contact };
    className?: string;
}

export function JobItem({ className = '', item }: JobItemProps) {
    const { id, name, contact, start, end, location } = item 

    const renderDateTime = () => {
        const startTime = moment(start);
        const endTime = moment(end);

        const startTimeStr = startTime.format('ddd MMM DD YYYY');
        const endTimeStr = endTime.format('ddd MMM DD YYYY');
        if (startTimeStr === endTimeStr) {
            return (
                <div className="job__datetime-group">
                    <div className="job__datetime">
                        <div data-testid='datetime-label' className="job__datetime__label">{startTimeStr}</div>
                        <div data-testid='datetime-value' className="bold-600 job__datetime__value">{startTime.format('hh:mm')} - {endTime.format('hh:mm')}</div>
                    </div>
                </div>
            );
        }
        return (
            <div className="job__datetime-group">
                <div data-testid="datetime-from" className="job__datetime-group__datetime">
                    <div className="bold-600 job__datetime-group__datetime__label">From</div>
                    <div className="job__datetime-group__datetime__value">{startTime.format('ddd MMM DD YYYY hh:mm A')}</div>
                </div>
                <div data-testid="datetime-to" className="job__datetime">
                    <div className="bold-600 job__datetime__label">To</div>
                    <div className="job__datetime__value">{endTime.format('ddd MMM DD YYYY hh:mm A')}</div>
                </div>
            </div>
        )
    }

    const renderJobId = () => id < 0 ? null : <span data-testid='job-id' className={`job__jobname-group__id`}> (Job #{id})</span>;
    const renderLocation = () => isEmpty(location) ? null : <div data-testid='job-location' className={`job__location`}>{location}</div>
    const renderContact = () => contact && contact.name ? <div data-testid='contact' className="job__contact">Contact: {contact.name}</div> : null

    return (
        <div data-testid="job" className={`job ${className}`}>
            <div className={`job__jobname-group`}>
                <span data-testid='job-name' className={`job__jobname-group__name`}>
                    {name}
                </span>
                {renderJobId()}
                <br />
                {renderLocation()}
            </div>
            {renderDateTime()}
            {renderContact()}
        </div>
    );
}
import React from 'react';
import { render, screen } from '@testing-library/react';
import moment from 'moment';
import { JobItem } from './JobItem';

describe('renders job item component', () => {
    const job = {
        id: 1,
        name: "Build a fence",
        contact: {
            id: 0,
            name: 'John Smith'
        },
        start: "2018-09-01T10:00:00",
        end: "2018-09-01T11:00:00",
        location: 'Brisbane'
    }
    test('should render JobItem when all props filled', () => {
        render(<JobItem item={job} />);
        const jobNameElement = screen.getByTestId('job-name');
        expect(jobNameElement.textContent).toBe('Build a fence');

        const jobIdElement = screen.queryByTestId('job-id');
        expect(jobIdElement).toHaveTextContent('(Job #1)');

        const jobLocationElement = screen.getByTestId('job-location');
        expect(jobLocationElement).toHaveTextContent(`Brisbane`)

        const dateTimeLabel = screen.getByTestId('datetime-label');
        expect(dateTimeLabel).toHaveTextContent(moment(job.start).format('ddd MMM DD YYYY'));

        const dateTimeValue = screen.getByTestId('datetime-value');
        expect(dateTimeValue).toHaveTextContent(`${moment(job.start).format('hh:mm')} - ${moment(job.end).format('hh:mm')}`);

        const contactElement = screen.getByTestId('contact');
        expect(contactElement).toHaveTextContent(`Contact: John Smith`)
    });

    test('should render JobItem when id < 0', () => {
        const extendedJob = {...job, id: -1}
        render(<JobItem item={extendedJob} />);
        const jobNameElement = screen.getByTestId('job-name');
        expect(jobNameElement.textContent).toBe('Build a fence');

        const jobIdElement = screen.queryByTestId('job-id');
        expect(jobIdElement).not.toBeInTheDocument()

        const jobLocationElement = screen.getByTestId('job-location');
        expect(jobLocationElement).toHaveTextContent(`Brisbane`);

        const dateTimeLabel = screen.getByTestId('datetime-label');
        expect(dateTimeLabel).toHaveTextContent(moment(job.start).format('ddd MMM DD YYYY'));

        const dateTimeValue = screen.getByTestId('datetime-value');
        expect(dateTimeValue).toHaveTextContent(`${moment(job.start).format('hh:mm')} - ${moment(job.end).format('hh:mm')}`);

        const contactElement = screen.getByTestId('contact');
        expect(contactElement).toHaveTextContent(`Contact: John Smith`)
    });

    test('should render JobItem when location is empty', () => {
        const extendedJob = {...job, location: ''}
        render(<JobItem item={extendedJob} />);
        const jobNameElement = screen.getByTestId('job-name');
        expect(jobNameElement.textContent).toBe('Build a fence');

        const jobIdElement = screen.queryByTestId('job-id');
        expect(jobIdElement).toHaveTextContent('(Job #1)');

        const jobLocationElement = screen.queryByTestId('job-location');
        expect(jobLocationElement).not.toBeInTheDocument();

        const dateTimeLabel = screen.getByTestId('datetime-label');
        expect(dateTimeLabel).toHaveTextContent(moment(job.start).format('ddd MMM DD YYYY'));

        const dateTimeValue = screen.getByTestId('datetime-value');
        expect(dateTimeValue).toHaveTextContent(`${moment(job.start).format('hh:mm')} - ${moment(job.end).format('hh:mm')}`);

        const contactElement = screen.getByTestId('contact');
        expect(contactElement).toHaveTextContent(`Contact: John Smith`)
    });

    test('should render JobItem when contact is empty', () => {
        const extendedJob = {...job, contact: undefined}
        render(<JobItem item={extendedJob} />);
        const jobNameElement = screen.getByTestId('job-name');
        expect(jobNameElement.textContent).toBe('Build a fence');

        const jobIdElement = screen.queryByTestId('job-id');
        expect(jobIdElement).toHaveTextContent('(Job #1)');

        const jobLocationElement = screen.queryByTestId('job-location');
        expect(jobLocationElement).toHaveTextContent(`Brisbane`);

        const dateTimeLabel = screen.getByTestId('datetime-label');
        expect(dateTimeLabel).toHaveTextContent(moment(job.start).format('ddd MMM DD YYYY'));

        const dateTimeValue = screen.getByTestId('datetime-value');
        expect(dateTimeValue).toHaveTextContent(`${moment(job.start).format('hh:mm')} - ${moment(job.end).format('hh:mm')}`);

        const contactElement = screen.queryByTestId('contact');
        expect(contactElement).not.toBeInTheDocument()
    });

    test('should render JobItem when contact NAME is empty', () => {
        const extendedJob = {...job, contact: {id:0, name: ''}}
        render(<JobItem item={extendedJob} />);
        const jobNameElement = screen.getByTestId('job-name');
        expect(jobNameElement.textContent).toBe('Build a fence');

        const jobIdElement = screen.queryByTestId('job-id');
        expect(jobIdElement).toHaveTextContent('(Job #1)');

        const jobLocationElement = screen.queryByTestId('job-location');
        expect(jobLocationElement).toHaveTextContent(`Brisbane`);

        const dateTimeLabel = screen.getByTestId('datetime-label');
        expect(dateTimeLabel).toHaveTextContent(moment(job.start).format('ddd MMM DD YYYY'));

        const dateTimeValue = screen.getByTestId('datetime-value');
        expect(dateTimeValue).toHaveTextContent(`${moment(job.start).format('hh:mm')} - ${moment(job.end).format('hh:mm')}`);

        const contactElement = screen.queryByTestId('contact');
        expect(contactElement).not.toBeInTheDocument()
    });

    test('should render JobItem when className is empty', () => {
        render(<JobItem item={job} />);
        const jobElement = screen.getByTestId('job');
        expect(jobElement).toHaveClass('job');
    });

    test('should render JobItem when className is not empty', () => {
        render(<JobItem item={job} className='job_item_class' />);
        const jobElement = screen.getByTestId('job');
        expect(jobElement).toHaveClass('job job_item_class');
    });
})

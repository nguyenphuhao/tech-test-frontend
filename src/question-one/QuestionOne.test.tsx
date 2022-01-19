import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QuestionOne } from './QuestionOne';
import getJobsWithSearchTermData from './__mocks__/getJobsWithSearchTermData';

const delay = (time: number) => new Promise((resolve) => setTimeout(() => resolve(''), time))
describe('renders QuestionOne component', () => {
    beforeEach(() => {
        const service = {
            getJobs: jest.fn(),
            getJobsWithSearchTerm: jest.fn(async (searchText: string) => {
                const data = getJobsWithSearchTermData.filter((job) => job.name.includes(searchText));
                return data;
            }),
            getActivities: jest.fn(),
            getJobAllocations: jest.fn(),
            getActivityAllocations: jest.fn(),
            getResources: jest.fn(),
            getContacts: jest.fn()
        }
        render(<QuestionOne service={service} />);
    });
    test('should render QuestionOne when search text is EMPTY', async () => {
        const searchBox = screen.getByPlaceholderText('Enter Job here...') as HTMLInputElement;
        //Search text length < 3 characters
        fireEvent.change(searchBox, { target: { value: '' } });
        await waitFor(() => delay(500));

        
        const jobList = await screen.findByTestId('job-list');
        //Search value should be Bu
        expect(searchBox.value).toBe('')

        //Job list should be empty
        expect(jobList.innerHTML).toBe('');
    });

    test('should render QuestionOne when search text is less than 3 characters', async () => {
        const searchBox = screen.getByPlaceholderText('Enter Job here...') as HTMLInputElement;
        //Search text length < 3 characters
        fireEvent.change(searchBox, { target: { value: 'Bu' } });
        await waitFor(() => delay(500));
        
        const jobList = await screen.findByTestId('job-list');
        //Search value should be Bu
        expect(searchBox.value).toBe('Bu')

        //Job list should be empty
        expect(jobList.innerHTML).toBe('');
    });

    test('should render QuestionOne when search text is equal to 3 characters', async () => {
        const searchBox = screen.getByPlaceholderText('Enter Job here...') as HTMLInputElement;
        //Search text length < 3 characters
        fireEvent.change(searchBox, { target: { value: 'Bui' } });
        await waitFor(() => delay(500));
        const jobList = await screen.findByTestId('job-list');
        //Search value should be Bu
        expect(searchBox.value).toBe('Bui')
        //Job list should be empty
        expect(jobList.children.length).toBe(2);
    });

    test('should render QuestionOne when search text is greater than 3 characters', async () => {
        const searchBox = screen.getByPlaceholderText('Enter Job here...') as HTMLInputElement;
        //Search text length < 3 characters
        fireEvent.change(searchBox, { target: { value: 'Build' } });
        await waitFor(() => delay(500));
        const jobList = await screen.findByTestId('job-list');
        //Search value should be Bu
        expect(searchBox.value).toBe('Build')
        //Job list should be empty
        expect(jobList.children.length).toBe(2);
    });

    test('should not trigger onSearchTextChange when timeout is less than 500ms', async () => {
        const searchBox = screen.getByPlaceholderText('Enter Job here...') as HTMLInputElement;
        //Search text length < 3 characters
        fireEvent.change(searchBox, { target: { value: 'Build' } });
        await waitFor(() => delay(400));
        const jobList = await screen.findByTestId('job-list');
        //Search value should be Bu
        expect(searchBox.value).toBe('Build')
        //Job list should be empty
        expect(jobList.innerHTML).toBe('');
    });

    test('should not when timeout is less than 500ms', async () => {
        const searchBox = screen.getByPlaceholderText('Enter Job here...') as HTMLInputElement;
        //Search text length < 3 characters
        fireEvent.change(searchBox, { target: { value: 'Build' } });
        await waitFor(() => delay(400));
        const jobList = await screen.findByTestId('job-list');
        //Search value should be Bu
        expect(searchBox.value).toBe('Build')
        //Job list should be empty
        expect(jobList.innerHTML).toBe('');
    });

})


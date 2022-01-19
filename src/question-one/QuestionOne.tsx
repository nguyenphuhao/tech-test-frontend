import React, { useEffect, useState } from "react"
import { v4 } from 'uuid';
import { IAppTabContainer } from "../common/types"

import { SectionGroup } from "../components/section/SectionGroup"
import { SectionPanel } from "../components/section/SectionPanel"
import { SearchBox } from "../components/search-box/SearchBox"

import { Loader } from "../components/loader/Loader"

import "./QuestionOne.css"

import debounce from 'lodash/debounce'
import useJobs from "../hooks/useJobs"
import { JobItem } from "../components/jobs/JobItem"

export const QuestionOne = ({ service }: IAppTabContainer) => {
  const [searchText, setSearchText] = useState('');
  const { isLoading, jobs, fetchJobsWithSearchTerm } = useJobs(service);
  useEffect(() => {
    fetchJobsWithSearchTerm(searchText);
  }, [searchText])

  const onSearchTextChange = debounce(setSearchText, 500)

  return (
    <SectionGroup>
      <SectionPanel>
        <h2>Jobs</h2>
        <Loader visible={isLoading} />
        <SearchBox onChange={onSearchTextChange} placeholder="Enter Job here..." />
        <div data-testid="job-list" className="question1-job-list">
          {jobs.map(({ name, start, end, contact }) => {
            const job = { name, start, end, contact, id: -1, location: '' };
            return <JobItem key={v4()} item={job} className="question1-job-list__job" />
          })}
        </div>
      </SectionPanel>
    </SectionGroup>
  )
}

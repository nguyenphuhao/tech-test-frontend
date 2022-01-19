import React, { useEffect } from "react"
import { IAppTabContainer } from "../common/types"
import { JobItem } from "../components/jobs/JobItem"

import { SectionGroup } from "../components/section/SectionGroup"
import { SectionPanel } from "../components/section/SectionPanel"
import useJobs from "../hooks/useJobs"
import { Header } from "./Header"

import "./QuestionThree.css"
import { SideBar } from "./SideBar"
import { isEmpty } from "lodash";

export const QuestionThree: React.FC<IAppTabContainer> = ({ service }) => {
  const { jobAllocations, fetchJobAllocations } = useJobs(service);

  useEffect(() => {
    fetchJobAllocations()
  }, [])
  return (
    <SectionGroup>
      <SectionPanel>
        <div className="question3">
          <SideBar />
          <div className="main">
            <Header>
              <div className='header__text'>Header</div>
            </Header>
            <div className="question3__rs">
              <div className="question3__rs__column question3__rs__resources">
                {jobAllocations.map((jobAllocation) => {
                  const {id, name, start, end, location, allocations} = jobAllocation;
                  const job = {
                    id, name, start, end, location
                  }
                  return (
                    <div className="question3__rs__resources__jobgroup" key={id}>
                      <JobItem item={job} className="question3__rs__resources__jobgroup__job" />
                      {isEmpty(allocations) ? null : <div className="question3__rs__resources__jobgroup__allocations">{allocations.length}</div>}
                    </div>
                  )
                })}
              </div>
              <div className="question3__rs__column question3__rs__allocations">
                <div className="question3__rs__allocations__block"></div>
                <div className="question3__rs__allocations__block"></div>
                <div className="question3__rs__allocations__block"></div>
                <div className="question3__rs__allocations__block"></div>
                <div className="question3__rs__allocations__block"></div>
                <div className="question3__rs__allocations__block"></div>
              </div>
            </div>
          </div>
        </div>
      </SectionPanel>
    </SectionGroup>
  )
}

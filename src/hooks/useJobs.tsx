import groupBy from "lodash/groupBy";
import isEmpty from "lodash/isEmpty";
import { useEffect, useRef, useState } from "react"
import { Contact, IDataService, Job, JobAllocations } from "../common/types";

export default function useJobs(service: IDataService) {
    const [jobList, setJobList] = useState<((Pick<Job, 'id' | 'name' | 'start' | 'end' | 'location'>) & { contact: Contact })[]>([]);
    const [jobAllocations, setJobAllocationList] = useState<(Job & { allocations: JobAllocations[] })[]>([]);
    const [isLoading, setLoading] = useState(false);

    const isScreenMounted = useRef(true);
    useEffect(() => {
        return () => {
            isScreenMounted.current = false
        }
    }, [])

    const fetchJobsWithSearchTerm = async (name = '') => {
        try {
            setLoading(true);
            if (!isEmpty(name) && name.trim().length >= 3) {
                const jobs = await service.getJobsWithSearchTerm(name);
                setJobList(jobs)
            } else {
                setJobList([])
            }
        } catch (error) {
            setJobList([]);
        } finally {
            setLoading(false);
        }
    }

    const fetchJobAllocations = async () => {
        try {
            setLoading(true);
            const [jobs, allocations] = await Promise.all([service.getJobs(), service.getJobAllocations()]);
            if (isEmpty(jobs)) {
                return;
            }

            const allocationGroup: { [key: number]: JobAllocations[] } = groupBy(allocations, (alloc) => [alloc.jobId]);

            const jobAllocs = jobs.map((job) => {
                return {
                    ...job,
                    allocations: allocationGroup[job.id] ?? []
                }
            })
            setJobAllocationList(jobAllocs)
        } catch (error) {
            setJobAllocationList([]);
        } finally {
            setLoading(false);
        }
    }
    return {
        isLoading,
        jobs: jobList,
        jobAllocations,
        fetchJobsWithSearchTerm,
        fetchJobAllocations
    };
}
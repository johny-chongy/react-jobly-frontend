import React from "react";
import JobCard from "./JobCard";

/** JobCardList displays information for many jobs
 *
 * Prop
 * - jobs = [{title, salary, equity, id}...]
 *
 * JobCard || CompanyDetail => JobCardList => JobCard
 */

function JobCardList({jobs=[], apply}) {
  return(
    <div className="JobCardList">
      {jobs.length
        ? jobs.map(job => <JobCard key={job.id} job={job} apply={apply}/>)
        : <div>Sorry, no jobs were found.</div>
      }
    </div>
  )
}

export default JobCardList;
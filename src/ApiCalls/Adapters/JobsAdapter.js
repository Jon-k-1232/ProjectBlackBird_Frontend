/**
 * Converts the each object into camal case. temporary use
 * @param {*} jobs array
 * @returns
 */
const jobsAdapter = jobs => {
  return jobs.map(job => {
    job.oid = job.OID;
    job.jobDefinition = job.jobdefinition;
    job.company = job.company;
    job.targetPrice = job.targetprice;
    job.defaultTargetPrice = job.defaulttargetprice;
    job.scheduledDate = job.scheduleddate;
    job.startDate = job.startdate;
    job.actualDate = job.actualdate;
    job.contact = job.contact;
    job.contactPhone = job.contactphone;
    job.contactEmail = job.contactemail;
    job.description = job.description;
    job.defaultDescription = job.defaultdescription;
    job.percentComplete = job.percentcomplete;
    job.discount = job.discount;
    job.hoursToComplete = job.hourstocomplete;
    job.isComplete = job.iscomplete;

    delete job.OID;
    delete job.jobdefinition;
    delete job.targetprice;
    delete job.defaulttargetprice;
    delete job.scheduleddate;
    delete job.startdate;
    delete job.actualdate;
    delete job.contactphone;
    delete job.contactemail;
    delete job.defaultdescription;
    delete job.percentcomplete;
    delete job.hourstocomplete;
    delete job.iscomplete;

    return job;
  });
};

export default jobsAdapter;

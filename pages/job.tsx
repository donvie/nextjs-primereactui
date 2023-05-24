'use client';

import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { JobService } from '../hooks/JobService';
import { ResidualService } from '../hooks/ResidualService';
import { useRouter } from 'next/router';
import { Tag } from 'primereact/tag';

interface Trait {
  traitName: string,
}

interface Job {
  jobStatus: string;
  requestJobDbId: string;
  requestDbId: number;
  analysisScript: Object;
}

interface Request {
  id: string;
  requestDbId: string;
  requestStatus: string;
  analysisType: string;
  requestCode: string;
  creationTimestamp: string;
  requestName: string;
  requestJobs: (Job | { [key: string]: any })[];
  traitList?: Trait[];
}

interface fileDatum {
  occ_id: number,
  expt_id: number,
  entry_id: number,
  plot_id: number,
  pa_x: number,
  pa_: number,
  rep_factor: number,
  blk: number,
  YLD_CONT_TON: number,
  "RESID.BLUEs": number,
  "RESID.BLUPs": number
}

interface jobOutput {
  fileData: (fileDatum | { [key: string]: any })[];
}

interface Residual {
  jobOutputs: (jobOutput | { [key: string]: any })[];
}

export default function Home() {
  const router = useRouter();
  const { jobID, requestID } = router.query;
  const [requests, setRequests] = useState<Request[]>([]);
  const [residuals, setResiduals] = useState<Residual | null>(null);
  const [selectedJob, setSelectedJob] = useState<Request | null>(null);

  useEffect(() => {
    console.log('requestID', requestID)
    JobService.getJobs().then((response) => {
      const data = response as Request[];
      setRequests(data)
      
      // Initialize
      const selectedJob = data[0].requestJobs.filter(requestJob => requestJob.requestJobDbId === parseInt(jobID))[0]
      setSelectedJob(selectedJob)

      // Load Residuals
      loadResiduals(selectedJob)
    });
  }, [jobID, requestID]);

  const statusBodyTemplate = (rowData: Job) => {
    return <Tag value={rowData.jobStatus} severity={getRequestSeverity(rowData.jobStatus)}></Tag>;
  };

  const getRequestSeverity = (status: String) => {
    switch (status) {
      case 'open':
        return 'success';

      case 'ready':
        return 'warning';

      case null:
        return 'danger';

      default:
        return null;
    }
  };

  const onSelectionChange = (event: any) => {
    const value = event.value as Request;
    setSelectedJob(value);
    changeRouteParams(value);
    loadResiduals(event);
  };

  const loadResiduals = (event: any) => {
    console.log('Request ID', event?.requestDbId)
    console.log('Job ID', event?.requestJobDbId)
    ResidualService.getResiduals().then((response) => {
      setResiduals(response);
    });
  }

  const changeRouteParams = (event: any) => {
    if (event) {
      router.push({
        pathname: '/job',
        query: { requestID: event?.requestDbId, jobID: event?.requestJobDbId },
      });
    }
  }

  return (
    <div className="grid">
      <div className="col-4">
        <div className="card">
          <DataTable value={requests[0]?.requestJobs} dataKey="requestJobDbId" selectionMode="single" selection={selectedJob!} 
            onSelectionChange={ onSelectionChange } metaKeySelection={false}>
            <Column field="requestJobDbId" header="Job" sortable />
            <Column field="jobStatus" body={statusBodyTemplate} header="Job Status" sortable />
            <Column field="analysisScript.scriptName" header="Script Name" sortable />
          </DataTable>
        </div>
      </div>
      <div className="col-8">
            <DataTable value={residuals?.[0]?.jobOutputs?.[0]?.fileData}>
              <Column field="entry_id" header="Entry No."></Column>
              <Column field="rep_factor" header="REP"></Column>
              <Column field="blk" header="Block"></Column>
              <Column field="pa_x" header="PA X"></Column>
              <Column field="pa_y" header="PA Y"></Column>
              <Column field="YLD_CONT_TON" header="Yield"></Column>
              <Column field="RESID.BLUEs" header="RESID. BLUEs"></Column>
            </DataTable>
      </div>
    </div>
  );
}
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { JobService } from '../hooks/JobService';
import { ResidualService } from '../hooks/ResidualService';
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
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

interface ColumnMeta {
  field: string;
  header: string;
}

export default function Home() {
  const router = useRouter();
  const { jobID, requestID } = router.query;
  const [requests, setRequests] = useState<Request[]>([]);
  const [residuals, setResiduals] = useState<Residual | null>(null);
  const [selectedJob, setSelectedJob] = useState<Request | null>(null);

  const columnsJob: ColumnMeta[] = [
    { field: 'requestJobDbId', header: 'Job' },
    { field: 'jobStatus', header: 'job Status' },
    { field: 'analysisScript.scriptName', header: 'Script Name' },
  ];

  const [visibleColumnsJob, setVisibleColumnsJob] = useState<ColumnMeta[]>(columnsJob);

  const columnsResidual: ColumnMeta[] = [
    { field: 'entry_id', header: 'Entry No.' },
    { field: 'rep_factor', header: 'REP' },
    { field: 'blk', header: 'Block' },
    { field: 'pa_x', header: 'PA X' },
    { field: 'pa_y', header: 'Script PA Y' },
    { field: 'YLD_CONT_TON', header: 'Yield' },
    { field: 'RESID.BLUEs', header: 'RESID. BLUEs' },
  ];

  const [visibleColumnsResidual, setvisibleColumnsResidual] = useState<ColumnMeta[]>(columnsResidual);

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

  const isSelectable = (data: any) => data.jobStatus === 'ready';
  const isRowSelectable = (event: any) => (event.data ? isSelectable(event.data) : true);

  const onColumnToggle = (event: MultiSelectChangeEvent) => {
    let selectedColumns = event.value;
    let orderedSelectedColumns = columnsJob.filter((col) => selectedColumns.some((sCol) => sCol.field === col.field));

    setVisibleColumnsJob(orderedSelectedColumns);
  };

  const onColumnToggle1 = (event: MultiSelectChangeEvent) => {
    let selectedColumns = event.value;
    let orderedSelectedColumns = columnsResidual.filter((col) => selectedColumns.some((sCol) => sCol.field === col.field));

    setvisibleColumnsResidual(orderedSelectedColumns);
  };

  const header = <MultiSelect value={visibleColumnsJob} options={columnsJob} optionLabel="header" onChange={onColumnToggle} className="w-full sm:w-20rem" display="chip" />;
  const header1 = <MultiSelect value={visibleColumnsResidual} options={columnsResidual} optionLabel="header" onChange={onColumnToggle1} className="w-full sm:w-20rem" display="chip" />;

  return (
    <div className="grid">
      <div className="col-4">
        <div className="card">
          <DataTable header={header} isDataSelectable={isRowSelectable}  value={requests[0]?.requestJobs} dataKey="requestJobDbId" selectionMode="single" selection={selectedJob!} 
            onSelectionChange={ onSelectionChange } metaKeySelection={false}>
            {visibleColumnsJob.map((col) => (
                <Column key={col.field} field={col.field} header={col.header} />
            ))}
          </DataTable>
        </div>
      </div>
      <div className="col-8">
            <DataTable header={header1} value={residuals?.[0]?.jobOutputs?.[0]?.fileData}>
              {visibleColumnsResidual.map((col) => (
                  <Column key={col.field} field={col.field} header={col.header} />
              ))}
            </DataTable>
      </div>
    </div>
  );
}
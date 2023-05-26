'use client';

import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { JobService } from '../hooks/JobService';
import { ResidualService } from '../hooks/ResidualService';
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import { useRouter } from 'next/router';
import { Tag } from 'primereact/tag';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { ListBox } from 'primereact/listbox';

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
  const [visible, setVisible] = useState<boolean>(false);
  const [visible1, setVisible1] = useState<boolean>(false);
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
    // if (value)
    if (value) {
      setSelectedJob(value);
      changeRouteParams(value);
      loadResiduals(event);
    }
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

  const onColumnToggleJobsRemove = (event: any) => {
    let selectedColumn = event.field;

    const filterVisibleColumnsJob = visibleColumnsJob.filter((visibleColumn) => visibleColumn.field !== selectedColumn)
    setVisibleColumnsJob(filterVisibleColumnsJob);
  };

  const onColumnToggleJobsAdd = (event: any) => {

    const filterVisibleColumnsJob = [...visibleColumnsJob, ...[event]]
    console.log('filterVisibleColumnsJob', filterVisibleColumnsJob)
    
    setVisibleColumnsJob(filterVisibleColumnsJob);
  };

  const onColumnToggleResidualRemove = (event: any) => {
    let selectedColumn = event.field;

    const filterVisibleColumnsResidual = visibleColumnsResidual.filter((visibleColumn) => visibleColumn.field !== selectedColumn)
    setvisibleColumnsResidual(filterVisibleColumnsResidual);
  };

  const onColumnToggleResidualAdd = (event: any) => {

    const filterVisibleColumnsResidual = [...visibleColumnsResidual, ...[event]]
    console.log('filterVisibleColumnsJob', filterVisibleColumnsResidual)
    
    setvisibleColumnsResidual(filterVisibleColumnsResidual);
  };

  const headerJob = <Button icon="pi pi-cog" onClick={() => setVisible(true)} />
  const headerResidual = <Button icon="pi pi-cog" onClick={() => setVisible1(true)} />

  return (
    <div>
      <Dialog header="List of Jobs Settings" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
        <div className="grid">
          <div className="col-6">
            <h5>Displayed Columns</h5>
            <ListBox options={visibleColumnsJob} optionLabel="header" onChange={(e) => onColumnToggleJobsRemove(e.value)} className="w-full md:w-14rem" />
          </div>
          <div className="col-6">
            <h5>Hidden Columns</h5>
            <ListBox options={ columnsJob.filter(({ field: id1 }) => !visibleColumnsJob.some(({ field: id2 }) => id2 === id1))} onChange={(e) => onColumnToggleJobsAdd(e.value)} optionLabel="header" className="w-full md:w-14rem" />
          </div>
        </div>
      </Dialog>

      <Dialog header="List of Residual Settings" visible={visible1} style={{ width: '50vw' }} onHide={() => setVisible1(false)}>
        <div className="grid">
          <div className="col-6">
            <h5>Displayed Columns</h5>
            <ListBox options={visibleColumnsResidual} optionLabel="header" onChange={(e) => onColumnToggleResidualRemove(e.value)} className="w-full md:w-14rem" />
          </div>
          <div className="col-6">
            <h5>Hidden Columns</h5>
            <ListBox options={ columnsResidual.filter(({ field: id1 }) => !visibleColumnsResidual.some(({ field: id2 }) => id2 === id1))} onChange={(e) => onColumnToggleResidualAdd(e.value)} optionLabel="header" className="w-full md:w-14rem" />
          </div>
        </div>
      </Dialog>

      <div className="grid">
        <div className="col-4">
          <div className="card">
            <DataTable header={headerJob} isDataSelectable={isRowSelectable}  value={requests[0]?.requestJobs} dataKey="requestJobDbId" selectionMode="single" selection={selectedJob!} 
              onSelectionChange={ onSelectionChange } metaKeySelection={false}>
              {visibleColumnsJob.map((col) => (
                  <Column key={col.field} field={col.field} header={col.header} />
              ))}
            </DataTable>
          </div>
        </div>
        <div className="col-8">
              <DataTable header={headerResidual} value={residuals?.[0]?.jobOutputs?.[0]?.fileData}>
                {visibleColumnsResidual.map((col) => (
                    <Column key={col.field} field={col.field} header={col.header} />
                ))}
              </DataTable>
        </div>
      </div>
    </div>
  );
}
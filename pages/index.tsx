'use client';

import React, { useState, useEffect, useRef } from 'react';
import { DataTable, DataTableExpandedRows, DataTableRowEvent, DataTableValueArray } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { RequestService } from '../hooks/RequestService';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Tag } from 'primereact/tag';
import { useRouter } from 'next/router';

interface Trait {
  traitName: string,
}

interface Job {
  jobStatus: string;
  requestJobDbId: string;
  requestDbId: number;
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

export default function Home() {
    const router = useRouter();
    const [requests, setRequests] = useState<Request[]>([]);
    const [expandedRows, setExpandedRows] = useState<DataTableExpandedRows | DataTableValueArray | undefined>(undefined);
    const toast = useRef<Toast>(null);

    useEffect(() => {
      RequestService.getRequests().then((response) => {
        const data = response as Request[];
        setRequests(data)
        console.log('asdf', data)
      });
    }, []);

    const onRowExpand = (event: DataTableRowEvent) => {
      toast.current?.show({ severity: 'info', summary: 'Request Expanded', detail: event.data.requestName, life: 3000 });
    };

    const onRowCollapse = (event: DataTableRowEvent) => {
      toast.current?.show({ severity: 'success', summary: 'Request Collapsed', detail: event.data.requestName, life: 3000 });
    };

    const expandAll = () => {
      let _expandedRows: DataTableExpandedRows = {};

      requests.forEach((p) => (_expandedRows[`${p.id}`] = true));
      setExpandedRows(_expandedRows);
    };

    const collapseAll = () => {
      setExpandedRows(undefined);
    };

    const allowExpansion = (rowData: Request) => {
      return rowData.requestJobs!.length > 0;
    };

    const statusBodyTemplate = (rowData: Request) => {
      return <Tag value={rowData.requestStatus} severity={getRequestSeverity(rowData.requestStatus)}></Tag>;
    };

    const statusRowExpansion = (rowData: Job) => {
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

    const bodyTemplateJobName = (request: Request, props: Object) => {
      const requestJobsLength = request.requestJobs?.length
      return `Multiple (${requestJobsLength})`
    };

    const bodyTemplateTrait = (request: Request, props: Object) => {
      return 'Multiple'
    };

    const traitRowExpansion = (request: Request, props: Object) => {
      const traits = request.traitList?.map((trait) => trait.traitName).join(', ');

      return <div>{traits}</div>;
    };

    const selectBodyTemplate = (request: Request, props: Object) => {
      const isJobReady = request.requestJobs?.filter(requestJob => requestJob.jobStatus === 'ready').length

      return isJobReady >= 1 ? <Button onClick={() => loadProduct(request)} icon="pi pi-eye" style={{ color: 'green' }} link /> : null;
    };

    const selectBodyRowExpansionTemplate = (request: Job, props: Object) => {
      return request.jobStatus === 'ready'? <Button onClick={() => loadRequest(request)} icon="pi pi-eye" style={{ color: 'green' }} link /> : null;
    };

    const loadProduct = (request: Request) => {
      const filterJobID = request.requestJobs?.filter(requestJob => requestJob.jobStatus === 'ready')[0]
      console.log('requestJobDbId', filterJobID.requestJobDbId)
      router.push({
        pathname: '/job',
        query: { requestID: request.requestDbId, jobID: filterJobID.requestJobDbId },
      });
      console.log('Product Selected', request)
    };

    const loadRequest = (job: Job) => {
      router.push({
        pathname: '/job',
        query: { requestID: job.requestDbId, jobID: job.requestJobDbId },
      });
      console.log('Job Selected', job)
    };

    const rowExpansionTemplate = (data: Request) => {
      return (
        <div className="p-3">
          <DataTable value={data.requestJobs}>
            <Column body={selectBodyRowExpansionTemplate}></Column>
            <Column field="requestJobDbId" header="Job Name" sortable></Column>
            <Column field="jobStatus" header="Request Status" body={statusRowExpansion} sortable></Column>
            <Column field="analysisScript.fileName" header="Occurrence" sortable></Column>
            <Column field="traitList" header="Trait" body={traitRowExpansion} sortable></Column>
          </DataTable>
        </div>
      );
    };

    const header = (
      <div className="flex flex-wrap justify-content-end gap-2">
        <Button icon="pi pi-plus" label="Expand All" onClick={expandAll} text />
        <Button icon="pi pi-minus" label="Collapse All" onClick={collapseAll} text />
      </div>
    );

    return (
      <div className="card">
        <Toast ref={toast} />
        <DataTable value={requests} expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
              onRowExpand={onRowExpand} onRowCollapse={onRowCollapse} rowExpansionTemplate={rowExpansionTemplate}
              dataKey="id" header={header} tableStyle={{ minWidth: '60rem' }}>
                
          <Column expander={allowExpansion} style={{ width: '5rem' }} />
          <Column body={selectBodyTemplate}></Column>
          <Column field="requestName" header="Request Name" sortable />
          <Column field="requestJobDbId" header="Job Name" sortable body={bodyTemplateJobName}  />
          <Column field="requestStatus" body={statusBodyTemplate} header="Request Status" sortable />
          <Column field="creationTimestamp" header="Created" sortable />
          <Column field="analysisType" header="Analysis Type" sortable />
          <Column field="requestCode" header="Occurence" sortable />
          <Column field="traitName" header="Trait" body={bodyTemplateTrait} sortable />
        </DataTable>
    </div>
  );
}
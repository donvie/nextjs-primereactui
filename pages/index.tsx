'use client';

import React, { useState, useEffect, useRef } from 'react';
import { DataTable, DataTableExpandedRows, DataTableRowEvent, DataTableValueArray } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from '../hooks/ProductService';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Tag } from 'primereact/tag';
import { useRouter } from 'next/router';

interface Trait {
  traitName: string,
}

interface RequestJob {
  jobStatus: string,
  requestJobDbId: string,
}

interface Product {
  id: string;
  requestDbId: string;
  requestStatus: string;
  analysisType: string;
  requestCode: string;
  creationTimestamp: string;
  requestName: string;
  requestJobs: (RequestJob | { [key: string]: any })[]; // Adjust type to allow for different job types
  traitList?: Trait[]; // Add traitList property
}

export default function Home() {
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [expandedRows, setExpandedRows] = useState<DataTableExpandedRows | DataTableValueArray | undefined>(undefined);
    const toast = useRef<Toast>(null);

    useEffect(() => {
      ProductService.getProductsWithOrdersSmall().then((response) => {
        const data = response as Product[];
        setProducts(data)
        console.log('asdf', data)
      });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const onRowExpand = (event: DataTableRowEvent) => {
      toast.current?.show({ severity: 'info', summary: 'Product Expanded', detail: event.data.requestName, life: 3000 });
    };

    const onRowCollapse = (event: DataTableRowEvent) => {
      toast.current?.show({ severity: 'success', summary: 'Product Collapsed', detail: event.data.requestName, life: 3000 });
    };

    const expandAll = () => {
      let _expandedRows: DataTableExpandedRows = {};

      products.forEach((p) => (_expandedRows[`${p.id}`] = true));

      setExpandedRows(_expandedRows);
    };

    const collapseAll = () => {
      setExpandedRows(undefined);
    };

    const allowExpansion = (rowData: Product) => {
      return rowData.requestJobs!.length > 0;
    };

    const statusBodyTemplate = (rowData: Product) => {
      return <Tag value={rowData.requestStatus} severity={getProductSeverity(rowData.requestStatus)}></Tag>;
    };

    const statusRowExpansion = (rowData: RequestJob) => {
      return <Tag value={rowData.jobStatus} severity={getProductSeverity(rowData.jobStatus)}></Tag>;
    };
    
    const getProductSeverity = (status: String) => {
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

    const bodyTemplateJobName = (product: Product, props: Object) => {
      const productLength = product.requestJobs?.length
      return `Multiple (${productLength})`
    };

    const bodyTemplateTrait = (product: Product, props: Object) => {
      return 'Multiple'
    };

    const traitRowExpansion = (product: Product, props: Object) => {
      const traits = product.traitList?.map((trait) => trait.traitName).join(', ');

      return <div>{traits}</div>;
    };

    const selectBodyTemplate = (product: Product, props: Object) => {

      return <Button onClick={() => load(product)} icon="pi pi-eye" style={{ color: 'green' }} link />;
    };

    const load = (product: Product) => {
      router.push({
        pathname: '/dashboard',
        query: { jobID: product.id, requestID: product.requestDbId },
      });
      console.log('Product Selected', product)
    };

    const rowExpansionTemplate = (data: Product) => {
      return (
        <div className="p-3">
          <DataTable value={data.requestJobs}>
            <Column body={selectBodyTemplate}></Column>
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
        <DataTable value={products} expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
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
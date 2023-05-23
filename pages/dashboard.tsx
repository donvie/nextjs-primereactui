'use client';
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from '../hooks/ProductService';
import { Tag } from 'primereact/tag';
import { useRouter } from 'next/router';

interface RequestJob {
  jobStatus: string;
  requestJobDbId: string;
}

interface JobOutput {
  fileData: any[];
}

interface Product {
  id: string;
  requestStatus: string;
  analysisType: string;
  requestCode: string;
  creationTimestamp: string;
  requestName: string;
  requestJobs: (RequestJob | { [key: string]: any })[];
  jobOutputs?: JobOutput[];
}

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Partial<Product> | null>(null);
    const router = useRouter();
    const { jobID, requestID } = router.query;

    useEffect(() => {
      loadRequestJobs ()
      ProductService.getProductsWithOrdersSmall().then((response) => {
        const data = response as Product[];
        setProducts(data)
      });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    const statusBodyTemplate = (rowData: Product) => {
      return <Tag value={rowData.requestStatus} severity={getProductSeverity(rowData.requestStatus)}></Tag>;
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

    const bodyTemplateTrait = (product: Product, props: Object) => {
      return 'Multiple'
    };


    const handleRowClick = (event: any) => {
        router.push({
          pathname: '/dashboard',
          query: { jobID: event.data.id, requestID: event.data.requestDbId },
        });
        loadRequestJobs(event.data)
    };

    const loadRequestJobs = (event: any) => {
      ProductService.getRequestJobs().then((response) => {
        if (response.length > 0) {
          console.log('requestDbId', jobID)
          console.log('requestDbId', requestID)
          setSelectedProduct(response[0]);
        }
      });
    }

    return (
      <div className="grid">
        <div className="col-4">
          <DataTable value={products} dataKey="id" onRowClick={handleRowClick}>
            <Column field="requestName" header="Request Name" sortable />
            <Column field="requestJobDbId" header="Job Name" sortable  />
            <Column field="requestStatus" body={statusBodyTemplate} header="Request Status" sortable />
            <Column field="creationTimestamp" header="Created" sortable />
            <Column field="analysisType" header="Analysis Type" sortable />
            <Column field="requestCode" header="Occurence" sortable />
            <Column field="traitName" header="Trait" body={bodyTemplateTrait} sortable />
          </DataTable>
      </div>
      <div className="col-8">
        {selectedProduct && selectedProduct.jobOutputs && (
          <DataTable value={selectedProduct.jobOutputs[0]?.fileData}>
            <Column field="entry_id" header="Entry No."></Column>
            <Column field="rep_factor" header="REP"></Column>
            <Column field="blk" header="Block"></Column>
            <Column field="pa_x" header="PA X"></Column>
            <Column field="pa_y" header="PA Y"></Column>
            <Column field="YLD_CONT_TON" header="Yield"></Column>
            <Column field="RESID.BLUEs" header="RESID. BLUEs"></Column>
          </DataTable>
        )}
      </div>
    </div>
  );
}
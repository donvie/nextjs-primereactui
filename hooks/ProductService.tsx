export const ProductService = {
    getProductsWithOrdersData() {
        return [
            {
                id: '1000',
                requestStatus: 'ready',
                analysisType: 'Bamboo Watch',
                requesterDbId: 1,
                message: null,
                requestCode: 'AREQ-20230508-00000001',
                creatorDbId: 1,
                requestDbId: 1,
                creationTimestamp: '2023-05-08T06:40:50.914705+00:00',
                requestName: 'Analysis Request #1',
                requestJobs: [
                    {
                        requestDbId: 1,
                        jobStatus: 'ready',
                        jobMetadata: null,
                        scriptDbId: 1,
                        creationTimestamp: '2023-05-16T07:05:38.727624+00:00',
                        requestJobDbId: 2,
                        traitList: [
                            {
                            traitCode: 'MC_CONT',
                            traitDbId: 182,
                            traitName: 'MC'
                            }
                        ],
                        jobMessage: null,
                        scriptVersionNumber: 1,
                        analysisScript: {
                        fileName: '/analysis-scripts/1',
                        scriptDbId: 1,
                        engine: 'LMMsolver',
                        versionNumber: 1,
                        scriptCode: 'SOA',
                        scriptName: 'Single-Occurrence Analysis',
                        command: 'soaLMM.R',
                        stageCode: null
                        }
                    },
                    {
                        requestDbId: 1,
                        jobStatus: 'processing',
                        jobMetadata: null,
                        scriptDbId: 1,
                        creationTimestamp: '2023-05-16T07:05:55.330355+00:00',
                        requestJobDbId: 3,
                        traitList: [
                            {
                                traitCode: 'AYLD_CONT',
                                traitDbId: 397,
                                traitName: 'AYLD'
                            }
                        ],
                        jobMessage: null,
                        scriptVersionNumber: 1,
                        analysisScript: {
                            fileName: '/analysis-scripts/1',
                            scriptDbId: 1,
                            engine: 'LMMsolver',
                            versionNumber: 1,
                            scriptCode: 'SOA',
                            scriptName: 'Single-Occurrence Analysis',
                            comman: 'soaLMM.R',
                            stageCode: null
                        }
                    }
                ],
                requestOutputs: [
                    {
                        requestOutputDbId: 2,
                        fileName: "analysis-requests/1/jobs/1/outputs/residuals.csv",
                        creationTimestamp: "2023-05-18T01:50:47.703852+00:00",
                        requestJobDbId: 2,
                        requestDbId: 1
                    }
                ]
            },
            {
                id: '1001',
                requestStatus: 'open',
                analysisType: 'Bamboo Watch',
                requesterDbId: 1,
                message: null,
                requestCode: 'AREQ-20230508-00000001',
                creatorDbId: 1,
                requestDbId: 2,
                creationTimestamp: '2023-05-08T06:40:50.914705+00:00',
                requestName: 'Analysis Request #1',
                requestJobs: [
                    {
                        requestDbId: 1,
                        jobStatus: 'ready',
                        jobMetadata: null,
                        scriptDbId: 1,
                        creationTimestamp: '2023-05-16T07:05:38.727624+00:00',
                        requestJobDbId: 2,
                        traitList: [
                            {
                            traitCode: 'MC_CONT',
                            traitDbId: 182,
                            traitName: 'MC'
                            },
                            {
                            traitCode: 'MC_CONT',
                            traitDbId: 182,
                            traitName: 'MC'
                            }
                        ],
                        jobMessage: null,
                        scriptVersionNumber: 1,
                        analysisScript: {
                        fileName: '/analysis-scripts/1',
                        scriptDbId: 1,
                        engine: 'LMMsolver',
                        versionNumber: 1,
                        scriptCode: 'SOA',
                        scriptName: 'Single-Occurrence Analysis',
                        command: 'soaLMM.R',
                        stageCode: null
                        }
                    },
                    {
                        requestDbId: 1,
                        jobStatus: 'processing',
                        jobMetadata: null,
                        scriptDbId: 1,
                        creationTimestamp: '2023-05-16T07:05:55.330355+00:00',
                        requestJobDbId: 3,
                        traitList: [
                            {
                                traitCode: 'AYLD_CONT',
                                traitDbId: 397,
                                traitName: 'AYLD'
                            }
                        ],
                        jobMessage: null,
                        scriptVersionNumber: 1,
                        analysisScript: {
                            fileName: '/analysis-scripts/1',
                            scriptDbId: 1,
                            engine: 'LMMsolver',
                            versionNumber: 1,
                            scriptCode: 'SOA',
                            scriptName: 'Single-Occurrence Analysis',
                            comman: 'soaLMM.R',
                            stageCode: null
                        }
                    }
                ],
                requestOutputs: [
                    {
                        requestOutputDbId: 2,
                        fileName: "analysis-requests/1/jobs/1/outputs/residuals.csv",
                        creationTimestamp: "2023-05-18T01:50:47.703852+00:00",
                        requestJobDbId: 2,
                        requestDbId: 1
                    }
                ]
            },
            {
                id: '1002',
                requestStatus: 'open',
                analysisType: 'Bamboo Watch',
                requesterDbId: 1,
                message: null,
                requestCode: 'AREQ-20230508-00000001',
                creatorDbId: 1,
                requestDbId: 3,
                creationTimestamp: '2023-05-08T06:40:50.914705+00:00',
                requestName: 'Analysis Request #1',
                requestJobs: [
                    {
                        requestDbId: 1,
                        jobStatus: 'ready',
                        jobMetadata: null,
                        scriptDbId: 1,
                        creationTimestamp: '2023-05-16T07:05:38.727624+00:00',
                        requestJobDbId: 2,
                        traitList: [
                            {
                            traitCode: 'MC_CONT',
                            traitDbId: 182,
                            traitName: 'MC'
                            }
                        ],
                        jobMessage: null,
                        scriptVersionNumber: 1,
                        analysisScript: {
                        fileName: '/analysis-scripts/1',
                        scriptDbId: 1,
                        engine: 'LMMsolver',
                        versionNumber: 1,
                        scriptCode: 'SOA',
                        scriptName: 'Single-Occurrence Analysis',
                        command: 'soaLMM.R',
                        stageCode: null
                        }
                    },
                    {
                        requestDbId: 1,
                        jobStatus: 'processing',
                        jobMetadata: null,
                        scriptDbId: 1,
                        creationTimestamp: '2023-05-16T07:05:55.330355+00:00',
                        requestJobDbId: 3,
                        traitList: [
                            {
                                traitCode: 'AYLD_CONT',
                                traitDbId: 397,
                                traitName: 'AYLD'
                            }
                        ],
                        jobMessage: null,
                        scriptVersionNumber: 1,
                        analysisScript: {
                            fileName: '/analysis-scripts/1',
                            scriptDbId: 1,
                            engine: 'LMMsolver',
                            versionNumber: 1,
                            scriptCode: 'SOA',
                            scriptName: 'Single-Occurrence Analysis',
                            comman: 'soaLMM.R',
                            stageCode: null
                        }
                    }
                ],
                requestOutputs: [
                    {
                        requestOutputDbId: 2,
                        fileName: "analysis-requests/1/jobs/1/outputs/residuals.csv",
                        creationTimestamp: "2023-05-18T01:50:47.703852+00:00",
                        requestJobDbId: 2,
                        requestDbId: 1
                    }
                ]
            }
        ];
    },

    getProductsPagination () {
        return {
            metadata: {
                pagination: {
                    pageSize: 1,
                    totalCount: 1,
                    currentPage: 1,
                    totalPages: 1
                },
                status: {
                    message: "Request has been successfully completed.",
                    messageType: "INFO"
                },
                datafiles: [],
                additional: {}
            },
        }
    },
    requestJobs() {
        return  [
            {
                "requestJobDbId": 4,
                "traitList": {},
                "jobMessage": null,
                "scriptVersionNumber": 1,
                "creationTimestamp": "2023-05-16T09:06:26.530701+00:00",
                "requestDbId": 1,
                "jobStatus": "processing",
                "jobMetadata": null,
                "scriptDbId": 6,
                "creatorDbId": 1,
                "analysisScript": {
                    "scriptCode": "test",
                    "scriptName": "test script",
                    "command": "test command",
                    "versionNumber": 1,
                    "scriptDbId": 6,
                    "fileName": "/analysis-script/1/script.R",
                    "engine": "lmm"
                },
                "jobOutputs": [
                    {
                        "requestOutputDbId": 2,
                        "fileName": "/analysis-requests/1/jobs/4/output/residuals.csv",
                        "creationTimestamp": "2023-05-18T09:34:54.131981+00:00",
                        "fileData": [
                            {
                                "occ_id": 13463,
                                "expt_id": 13749,
                                "entry_id": 2133455,
                                "plot_id": 39432804,
                                "pa_x": 1,
                                "pa_y": 1,
                                "rep_factor": 1,
                                "blk": 1,
                                "YLD_CONT_TON": 3.81,
                                "RESID.BLUEs": 0.1238071287,
                                "RESID.BLUPs": -0.4870201765
                            },
                            {
                                "occ_id": 13463,
                                "expt_id": 13749,
                                "entry_id": 2133465,
                                "plot_id": 39432805,
                                "pa_x": 2,
                                "pa_y": 1,
                                "rep_factor": 1,
                                "blk": 1,
                                "YLD_CONT_TON": 4.92,
                                "RESID.BLUEs": 0.315969061,
                                "RESID.BLUPs": 0.0974994065
                            }
                        ]
                    }
                ]
            }
        ]
    },
    getRequestJobs() {
        return Promise.resolve(this.requestJobs().slice(0, 10));
    },
    getProductsWithOrdersSmall() {
        return Promise.resolve(this.getProductsWithOrdersData().slice(0, 10));
    }
};
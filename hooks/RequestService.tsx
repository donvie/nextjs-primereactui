export const RequestService = {
    fetchRequests() {
        return [
            {
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
    getRequests() {
        return Promise.resolve(this.fetchRequests().slice(0, 10));
    }
};


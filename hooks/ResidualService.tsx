export const ResidualService = {
    fetchResiduals () {
        return  [
            {
                requestJobDbId: 4,
                traitList: {},
                jobMessage: null,
                scriptVersionNumber: 1,
                creationTimestamp: "2023-05-16T09:06:26.530701+00:00",
                requestDbId: 1,
                jobStatus: "processing",
                jobMetadata: null,
                scriptDbId: 6,
                creatorDbId: 1,
                analysisScript: {
                    scriptCode: "test",
                    scriptName: "test script",
                    command: "test command",
                    versionNumber: 1,
                    scriptDbId: 6,
                    fileName: "/analysis-script/1/script.R",
                    engine: "lmm"
                },
                jobOutputs: [
                    {
                        requestOutputDbId: 2,
                        fileName: "/analysis-requests/1/jobs/4/output/residuals.csv",
                        creationTimestamp: "2023-05-18T09:34:54.131981+00:00",
                        fileData: [
                            {
                                occ_id: 13463,
                                expt_id: 13749,
                                entry_id: 2133455,
                                plot_id: 39432804,
                                pa_x: 1,
                                pa_: 1,
                                rep_factor: 1,
                                blk: 1,
                                YLD_CONT_TON: 3.81,
                                "RESID.BLUEs": 0.1238071287,
                                "RESID.BLUPs": -0.4870201765
                            },
                            {
                                occ_id: 13462,
                                expt_id: 13742,
                                entry_id: 2222222,
                                plot_id: 33333333,
                                pa_x: 2,
                                pa_y: 1,
                                rep_factor: 1,
                                blk: 1,
                                YLD_CONT_TO: 4.92,
                                "RESID.BLUEs": 0.315969061,
                                "RESID.BLUPs": 0.0974994065
                            }
                        ]
                    }
                ]
            }
        ]
    },
    getResiduals() {
        return Promise.resolve(this.fetchResiduals().slice(0, 10));
    }
};
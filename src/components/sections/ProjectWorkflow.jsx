import React from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiMoreHorizontal, FiFileText, FiTool, FiDatabase } from 'react-icons/fi';
import { FaFlask } from 'react-icons/fa';

export default function ProjectWorkflow() {
    const stages = [
        {
            id: 1,
            title: "Project Approval & Mobilization",
            description: "Client request review, documentation approval, and scheduling of investigation activities according to project requirements and UAE authority regulations.",
            status: "Completed",
            icon: <FiCheck />,
            statusLabel: "Approved"
        },
        {
            id: 2,
            title: "Engineering Team Preparation",
            description: "Allocation of geologists, drilling operators, and field technicians. Equipment inspection and site planning prior to mobilization.",
            status: "Completed",
            icon: <FiCheck />,
            statusLabel: "Ready for Field Work"
        },
        {
            id: 3,
            title: "Field Investigation & Sample Collection",
            description: "Rotary drilling operations, Standard Penetration Testing (SPT), soil and rock sampling, and groundwater measurements conducted at site locations.",
            status: "Completed",
            icon: <FiCheck />,
            statusLabel: "Samples Collected"
        },
        {
            id: 4,
            title: "Laboratory Testing & Analysis",
            description: "Samples transferred to the laboratory for geotechnical and chemical testing including soil classification, moisture content, sulphate and chloride analysis, and rock strength testing.",
            status: "In Progress",
            icon: <FaFlask />,
            statusLabel: "In Progress",
            isProgress: true,
            progress: 65
        },
        {
            id: 5,
            title: "Engineering Reporting & Certified Results",
            description: "Preparation of certified geotechnical investigation reports and engineering analysis in accordance with international testing standards. Estimated reporting period may extend up to several weeks depending on laboratory analysis requirements.",
            status: "Pending",
            icon: <FiFileText />,
            statusLabel: "Pending"
        }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed': return 'bg-[#10B981] text-white border-[#10B981]';
            case 'In Progress': return 'bg-[#FFD700] text-white border-[#FFD700]';
            case 'Pending': return 'bg-gray-100 text-gray-400 border-gray-200';
            default: return 'bg-gray-100 text-gray-400 border-gray-200';
        }
    };

    const getLineColor = (status) => {
        switch (status) {
            case 'Completed': return 'bg-[#10B981]';
            case 'In Progress': return 'bg-[#FFD700]';
            default: return 'bg-gray-200';
        }
    };

    return (
        <section className="py-20 bg-white">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h3 className="text-[#E9B10C] font-bold text-sm tracking-[0.2em] uppercase mb-3 text-center">
                        PROJECT WORKFLOW
                    </h3>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight text-center">
                        5-Stage Engineering Progress
                    </h2>
                    <p className="text-gray-500 text-center max-w-2xl mx-auto">
                        Track your project through each critical phase of our accredited soil investigation and laboratory testing process.
                    </p>
                </div>

                {/* Top Summary Status Bar */}
                <div className="flex justify-between items-center mb-20 relative px-4 md:px-12">
                    {/* Connecting Line Background */}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -z-10 transform -translate-y-1/2"></div>

                    {stages.map((stage, index) => (
                        <div key={stage.id} className="flex flex-col items-center relative bg-white px-2">
                            {/* Connector Line (Colored) */}
                            {index < stages.length - 1 && (
                                <div className={`absolute top-1/2 left-full w-full h-1 -z-10 transform -translate-y-1/2 ${stage.status === 'Completed' ? 'bg-[#10B981]' : (stage.status === 'In Progress' ? 'bg-[#FFD700]' : 'bg-gray-200')
                                    }`} style={{ width: "100px", left: "50%" }}></div>
                            )}

                            <div className={`w-12 h-12 flex items-center justify-center rounded-lg mb-2 text-xl font-bold transition-all duration-300 ${getStatusColor(stage.status)}`}>
                                {stage.status === 'Completed' ? <FiCheck /> : (stage.status === 'In Progress' ? stage.id : stage.id)}
                            </div>
                            <span className={`text-xs font-semibold ${stage.status === 'Completed' ? 'text-[#10B981]' : (stage.status === 'In Progress' ? 'text-[#FFD700]' : 'text-gray-400')}`}>
                                {stage.status}
                            </span>
                        </div>
                    ))}
                </div>


                {/* Vertical Timeline Stages */}
                <div className="space-y-12 relative">
                    {/* Vertical Line */}
                    <div className="absolute left-[27px] top-8 bottom-8 w-0.5 bg-gray-200 -z-10"></div>

                    {stages.map((stage, index) => (
                        <motion.div
                            key={stage.id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex gap-8 group"
                        >
                            {/* Icon Column */}
                            <div className="flex-shrink-0">
                                <div className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center text-2xl transition-all duration-300 bg-white ${stage.status === 'Completed' ? 'border-[#10B981] text-[#10B981] bg-green-50' :
                                        (stage.status === 'In Progress' ? 'border-[#FFD700] text-[#FFD700]' : 'border-gray-200 text-gray-300')
                                    }`}>
                                    {stage.status === 'Completed' ? <FiCheck /> : (stage.status === 'In Progress' ? <FaFlask /> : <FiFileText />)}
                                </div>
                            </div>

                            {/* Content Column */}
                            <div className="flex-grow pt-1">
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2">
                                    <div>
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 block">STAGE {stage.id}</span>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{stage.title}</h3>
                                    </div>
                                    <div className={`mt-2 md:mt-0 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide inline-flex items-center gap-2 w-fit ${stage.status === 'Completed' ? 'bg-[#E6F8F2] text-[#10B981]' :
                                            (stage.status === 'In Progress' ? 'bg-[#FFF9E5] text-[#FFD700]' : 'bg-gray-100 text-gray-400')
                                        }`}>
                                        <span className={`w-2 h-2 rounded-full ${stage.status === 'Completed' ? 'bg-[#10B981]' :
                                                (stage.status === 'In Progress' ? 'bg-[#FFD700]' : 'bg-gray-400')
                                            }`}></span>
                                        {stage.statusLabel}
                                    </div>
                                </div>

                                <p className="text-gray-500 leading-relaxed mb-6 max-w-3xl">
                                    {stage.description}
                                </p>

                                {/* Progress Bar for "In Progress" Items */}
                                {stage.isProgress && (
                                    <div className="max-w-xl">
                                        <div className="flex justify-between text-xs font-bold text-[#FFD700] mb-2">
                                            <span>Lab Testing Progress</span>
                                            <span>{stage.progress}%</span>
                                        </div>
                                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                            <div
                                                className="bg-[#FFD700] h-full rounded-full transition-all duration-1000"
                                                style={{ width: `${stage.progress}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
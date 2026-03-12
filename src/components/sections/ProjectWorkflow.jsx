import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiCheck, FiMoreHorizontal, FiFileText, FiTool, FiDatabase } from 'react-icons/fi';
import { FaFlask } from 'react-icons/fa';

export default function ProjectWorkflow() {
    const { t } = useTranslation();

    const stages = [
        {
            id: 1,
            title: t('project_workflow.stages.s1.title'),
            description: t('project_workflow.stages.s1.desc'),
            status: 'Completed',
            icon: <FiCheck />,
            statusLabel: t('project_workflow.stages.s1.label')
        },
        {
            id: 2,
            title: t('project_workflow.stages.s2.title'),
            description: t('project_workflow.stages.s2.desc'),
            status: 'Completed',
            icon: <FiCheck />,
            statusLabel: t('project_workflow.stages.s2.label')
        },
        {
            id: 3,
            title: t('project_workflow.stages.s3.title'),
            description: t('project_workflow.stages.s3.desc'),
            status: 'Completed',
            icon: <FiCheck />,
            statusLabel: t('project_workflow.stages.s3.label')
        },
        {
            id: 4,
            title: t('project_workflow.stages.s4.title'),
            description: t('project_workflow.stages.s4.desc'),
            status: 'In Progress',
            icon: <FaFlask />,
            statusLabel: t('project_workflow.stages.s4.label'),
            isProgress: true,
            progress: 65
        },
        {
            id: 5,
            title: t('project_workflow.stages.s5.title'),
            description: t('project_workflow.stages.s5.desc'),
            status: 'Pending',
            icon: <FiFileText />,
            statusLabel: t('project_workflow.stages.s5.label')
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

    const getTranslatedStatus = (status) => {
        switch (status) {
            case 'Completed': return t('project_workflow.status.completed');
            case 'In Progress': return t('project_workflow.status.in_progress');
            case 'Pending': return t('project_workflow.status.pending');
            default: return status;
        }
    };

    return (
        <section className="py-20 bg-white">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h3 className="text-[#E9B10C] font-bold text-sm tracking-[0.2em] uppercase mb-3 text-center">
                        {t('project_workflow.label')}
                    </h3>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight text-center">
                        {t('project_workflow.title')}
                    </h2>
                    <p className="text-gray-500 text-center max-w-2xl mx-auto">
                        {t('project_workflow.desc')}
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
                                {stage.status === 'Completed' ? <FiCheck /> : stage.id}
                            </div>
                            <span className={`text-xs font-semibold ${stage.status === 'Completed' ? 'text-[#10B981]' : (stage.status === 'In Progress' ? 'text-[#FFD700]' : 'text-gray-400')}`}>
                                {getTranslatedStatus(stage.status)}
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
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 block">{t('project_workflow.stage')} {stage.id}</span>
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
                                            <span>{t('project_workflow.lab_progress')}</span>
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
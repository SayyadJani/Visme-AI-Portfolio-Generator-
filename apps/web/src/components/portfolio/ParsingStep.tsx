"use client"

import { GlassCard } from "./parsing/UIComponents"
import { ParsingHeader } from "./parsing/ParsingHeader"
import { PersonalIdentitySection } from "./parsing/PersonalIdentitySection"
import { ExperienceSection } from "./parsing/ExperienceSection"
import { SidePanel } from "./parsing/SidePanel"
import { ControlBar } from "./parsing/ControlBar"
import { MOCK_RECONCILIATION_DATA } from "./parsing/mockData"

interface ReconciliationStepProps {
    onFinish: () => void
}

export const ParsingStep = ({ onFinish }: ReconciliationStepProps) => {
    const reconciliationData = MOCK_RECONCILIATION_DATA;

    return (
        <div className="max-w-[1400px] mx-auto space-y-12 pb-48">
            <ParsingHeader data={reconciliationData} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* 1. Parsed Information - Primary Content */}
                <div className="lg:col-span-8 space-y-8">
                    <GlassCard className="p-10 space-y-12">
                        <PersonalIdentitySection data={reconciliationData} />
                        <ExperienceSection data={reconciliationData} />
                    </GlassCard>
                </div>

                {/* 2. Side Panel - Action Items & Orphaned Data */}
                <SidePanel data={reconciliationData} />
            </div>

            {/* Premium Integrated Control Bar */}
            <ControlBar data={reconciliationData} onFinish={onFinish} />
        </div>
    )
}

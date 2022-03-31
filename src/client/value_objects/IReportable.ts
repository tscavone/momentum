//
// Interface for value objects that need to return appropriate jsx components for their
// reports
import { ReactNode } from 'react'

export interface IReportable {
    renderReportComponent(): ReactNode
}

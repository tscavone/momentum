export const dateToString = (date: Date): string => {
    return date.toISOString().split('T')[0]
}

export const checkRequiredFields = (
    fieldNames: string[],
    objectWithFields,
    path
): void => {
    let missingFields: string[] = []
    for (const fieldName of fieldNames) {
        const fieldVal = objectWithFields[fieldName]
        if (typeof fieldVal === 'undefined' || fieldVal === '') {
            missingFields.push(fieldName)
        }
    }

    if (missingFields.length !== 0) {
        throw new Error(
            `missing field(s) in ${path}:  ` + missingFields.join(',')
        )
    }
}

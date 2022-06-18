export const dateToString = (date: Date): string => {
    return date.toISOString().split('T')[0]
}

//returns true on error
export const checkRequiredFields = (
    fieldNames: string[],
    objectWithFields,
    path,
    next
): boolean => {
    let missingFields: string[] = []
    for (const fieldName of fieldNames) {
        const fieldVal = objectWithFields[fieldName]
        if (typeof fieldVal === 'undefined' || fieldVal === '') {
            missingFields.push(fieldName)
        }
    }

    if (missingFields.length !== 0) {
        Promise.resolve()
            .then(() => {
                throw new Error(
                    `missing field(s) in ${path}:  ` + missingFields.join(',')
                )
            })
            .catch(next)

        return true
    }

    return false
}

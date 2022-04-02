export const DatePicker = ({ onChange, label, value }) => {
    let pickerStyle = {
        border: '1px solid #406039',
        padding: '3px',
        borderRadius: '5px',
        margin: '5px',
    }
    return (
        <div className="date-picker">
            <span>{label}</span>
            <input
                type="date"
                onChange={onChange}
                value={value}
                style={pickerStyle}
            />
        </div>
    )
}

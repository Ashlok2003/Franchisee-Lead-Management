import path from 'path';
import XLSX from 'xlsx';

function generateTemplate() {
    const ws = XLSX.utils.json_to_sheet([], {
        header: [
            'name_of_lead',
            'city',
            'state',
            'contact_number',
            'email_id',
            'franchise_developer_name',
            'source',
            'date_of_campaign',
            'month',
            'financial_year',
            'status',
            'notes',
            'revenue_amount',
            'team_leader_assign',
            'lead_update_status',
            'leadType',
            'remark',
        ],
    });
    
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Leads');
    const filePath = path.join(__dirname, '../../uploads/Lead-Template.xlsx');
    XLSX.writeFile(wb, filePath);
    return filePath;
}

export default generateTemplate;

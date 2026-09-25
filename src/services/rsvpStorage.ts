import { RsvpRecord } from '../types';

const STORAGE_KEY = 'sophie_xv_rsvp_records_v1';

export const getStoredRsvps = (): RsvpRecord[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Error loading RSVPs from localStorage:', error);
    return [];
  }
};

export const saveRsvpRecord = (entry: Omit<RsvpRecord, 'id' | 'timestamp' | 'formattedDate'>): RsvpRecord => {
  const current = getStoredRsvps();
  const now = new Date();
  
  const record: RsvpRecord = {
    id: `rsvp_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    fullName: entry.fullName.trim(),
    phone: entry.phone.trim(),
    attending: entry.attending,
    guestsCount: entry.attending === 'yes' ? (entry.guestsCount || 1) : 0,
    timestamp: now.toISOString(),
    formattedDate: now.toLocaleString('es-PE', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }),
  };

  const updated = [record, ...current];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error saving RSVP to localStorage:', error);
  }

  return record;
};

export const deleteRsvpRecord = (id: string): RsvpRecord[] => {
  const current = getStoredRsvps();
  const updated = current.filter((r) => r.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error deleting RSVP:', error);
  }
  return updated;
};

export const clearAllRsvps = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing RSVPs:', error);
  }
};

export const exportRsvpsToExcelXML = (): void => {
  const records = getStoredRsvps();
  if (records.length === 0) {
    return;
  }

  const escapeXml = (unsafe: string = '') => {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  };

  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10);

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
 <DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">
  <Title>Lista de Invitados - XV Años Sophie Shanell</Title>
  <Created>${now.toISOString()}</Created>
 </DocumentProperties>
 <Styles>
  <Style ss:ID="Default" ss:Name="Normal">
   <Alignment ss:Vertical="Center"/>
   <Borders/>
   <Font ss:FontName="Calibri" ss:Size="11" ss:Color="#000000"/>
  </Style>
  <Style ss:ID="HeaderTitle">
   <Font ss:FontName="Calibri" ss:Size="14" ss:Bold="1" ss:Color="#0B1A30"/>
   <Alignment ss:Horizontal="Left" ss:Vertical="Center"/>
  </Style>
  <Style ss:ID="TableHeader">
   <Font ss:FontName="Calibri" ss:Size="11" ss:Bold="1" ss:Color="#FFFFFF"/>
   <Interior ss:Color="#0B1A30" ss:Pattern="Solid"/>
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#C29043"/>
   </Borders>
  </Style>
  <Style ss:ID="DataCell">
   <Alignment ss:Vertical="Center"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#D1D5DB"/>
   </Borders>
  </Style>
  <Style ss:ID="DataCellCenter">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#D1D5DB"/>
   </Borders>
  </Style>
  <Style ss:ID="StatusConfirmed">
   <Font ss:FontName="Calibri" ss:Size="11" ss:Bold="1" ss:Color="#047857"/>
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#D1D5DB"/>
   </Borders>
  </Style>
  <Style ss:ID="StatusDeclined">
   <Font ss:FontName="Calibri" ss:Size="11" ss:Bold="1" ss:Color="#B91C1C"/>
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#D1D5DB"/>
   </Borders>
  </Style>
 </Styles>
 <Worksheet ss:Name="Invitados">
  <Table ss:DefaultRowHeight="20">
   <Column ss:Width="40"/>
   <Column ss:Width="220"/>
   <Column ss:Width="150"/>
   <Column ss:Width="140"/>
   <Column ss:Width="160"/>
   
   <Row ss:Height="26">
    <Cell ss:MergeAcross="4" ss:StyleID="HeaderTitle">
     <Data ss:Type="String">LISTA DE ASISTENCIA — XV AÑOS DE SOPHIE SHANELL</Data>
    </Cell>
   </Row>
   <Row ss:Height="12"/>
   
   <Row ss:StyleID="TableHeader" ss:Height="24">
    <Cell><Data ss:Type="String">#</Data></Cell>
    <Cell><Data ss:Type="String">Nombre Completo</Data></Cell>
    <Cell><Data ss:Type="String">Teléfono / WhatsApp</Data></Cell>
    <Cell><Data ss:Type="String">Estado de Asistencia</Data></Cell>
    <Cell><Data ss:Type="String">Fecha de Registro</Data></Cell>
   </Row>
   ${records
     .map(
       (r, i) => `
   <Row ss:Height="22">
    <Cell ss:StyleID="DataCellCenter"><Data ss:Type="Number">${i + 1}</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">${escapeXml(r.fullName)}</Data></Cell>
    <Cell ss:StyleID="DataCellCenter"><Data ss:Type="String">${escapeXml(r.phone)}</Data></Cell>
    <Cell ss:StyleID="${r.attending === 'yes' ? 'StatusConfirmed' : 'StatusDeclined'}"><Data ss:Type="String">${r.attending === 'yes' ? 'CONFIRMADO' : 'NO ASISTIRÁ'}</Data></Cell>
    <Cell ss:StyleID="DataCellCenter"><Data ss:Type="String">${escapeXml(r.formattedDate)}</Data></Cell>
   </Row>`
     )
     .join('')}
  </Table>
 </Worksheet>
</Workbook>`;

  const blob = new Blob([xmlContent], { type: 'application/vnd.ms-excel;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Lista_Invitados_Sophie_Shanell_${dateStr}.xml`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportRsvpsToCSV = (): void => {
  // Alias or fallback that also exports
  exportRsvpsToExcelXML();
};

export const exportRsvpsToJSON = (): void => {
  const records = getStoredRsvps();
  if (records.length === 0) {
    alert('No hay registros de confirmación para exportar aún.');
    return;
  }

  const jsonContent = JSON.stringify(records, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Lista_Invitados_Sophie_Shanell_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

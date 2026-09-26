import { INVITATION_CONFIG } from '../config';
import { RsvpRecord } from '../types';

interface SheetResponse {
  ok?: boolean;
  error?: string;
  record?: RsvpRecord;
  records?: RsvpRecord[];
}

async function postSheet(body: Record<string, unknown>): Promise<SheetResponse> {
  const url = INVITATION_CONFIG.rsvpScriptUrl.trim();
  if (!url) {
    throw new Error('La lista todavía no está conectada a la hoja de Google.');
  }

  const response = await fetch(url, {
    method: 'POST',
    redirect: 'follow',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(body),
  });

  const text = await response.text();
  let data: SheetResponse;
  try {
    data = JSON.parse(text) as SheetResponse;
  } catch {
    throw new Error('La hoja de Google no respondió. Revisa que el script esté publicado como aplicación web, con acceso para cualquier persona.');
  }

  if (!data.ok) {
    throw new Error(data.error || 'No se pudo completar la operación.');
  }

  return data;
}

export const saveRsvpRecord = async (
  entry: Pick<RsvpRecord, 'fullName' | 'phone'>
): Promise<RsvpRecord> => {
  const data = await postSheet({
    action: 'add',
    fullName: entry.fullName.trim(),
    phone: entry.phone.trim(),
  });

  if (!data.record) {
    throw new Error('La hoja no devolvió la confirmación.');
  }

  return data.record;
};

export const fetchRsvps = async (pin: string): Promise<RsvpRecord[]> => {
  const data = await postSheet({ action: 'list', pin });
  return Array.isArray(data.records) ? data.records : [];
};

export const deleteRsvpRecord = async (id: string, pin: string): Promise<RsvpRecord[]> => {
  const data = await postSheet({ action: 'delete', id, pin });
  return Array.isArray(data.records) ? data.records : [];
};

export const clearAllRsvps = async (pin: string): Promise<void> => {
  await postSheet({ action: 'clear', pin });
};

export const exportRsvpsToExcelXML = (records: RsvpRecord[]): void => {
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

export const exportRsvpsToCSV = (records: RsvpRecord[]): void => {
  exportRsvpsToExcelXML(records);
};

export const exportRsvpsToJSON = (records: RsvpRecord[]): void => {
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

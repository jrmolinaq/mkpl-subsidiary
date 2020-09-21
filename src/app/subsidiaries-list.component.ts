import { Component, OnInit, Input } from '@angular/core';

import { ROLES } from './constants/auth';
import { SubsidiaryService } from './services/subsidiary.service';
import { tableHeaders } from './constants/subsidiaries-list-constants';
import { DataPaginator } from './interfaces/paginator.interface';
import { Subsidiary, SubsidiaryListResponse } from './interfaces/subsidiaries.interface';

declare const Liferay: any;

@Component({
  selector: 'subsidiaries-list',
  templateUrl:
    Liferay.ThemeDisplay.getPathContext() + 
    '/o/mkpl-subsidiary/app/subsidiaries-list.component.html'
})
export class SubsidiariesListComponent implements OnInit {
  subsidiaries: Subsidiary[];
  dataToPaginate: DataPaginator;
  tableInfo: Array<{ label: string; id: string; sortable: boolean }> = tableHeaders;
  orderBy = true;
  @Input() dataToSubsidiaries: SubsidiaryListResponse;
  canCreateSubsidiary = false;
  canUpdateStatus = false;
  canEdit = false;
  canViewDetail = false;

  constructor(private subsidiaryService: SubsidiaryService) { }

  ngOnInit() {
    // TODO traer permisos de liferay
    // TODO si tiene permisos de createSubsidiary, updateSubsidiaryStatus, readSubsidiary
    this.canCreateSubsidiary = true;
    this.canUpdateStatus = true;
    this.canViewDetail = true;

    // TODO traer de liferay rol y permisos
    // TODO si no es backoffice y tiene permiso de updateSubsidiary
    let role = ROLES.provider;
    this.canEdit = role !== ROLES.backoffice && true;

    const { content, ...dataPaginator } = this.dataToSubsidiaries;
    this.subsidiaries = content;
    this.dataToPaginate = dataPaginator;
  }

  disableSubsidiary(id: any) {
    this.subsidiaryService
      .toggleSubsidiaries(id)
      .subscribe(
        ({ id: elemId, status }: { id: number, status: boolean }) =>
          (this.subsidiaries = this.subsidiaries.map(elem =>
            elem.id === elemId ? { ...elem, status } : elem
          ))
      );
  }

  handleOrder(id: any) {
    const orderBy = this.orderBy ? 'ascending' : 'descending';
    this.orderBy = !this.orderBy;
    // TODO traer el id de proveedor
    this.subsidiaryService.getSubsidiaries(1, id, orderBy).subscribe(({ content }) => {
      this.subsidiaries = content;
    });
  }
}

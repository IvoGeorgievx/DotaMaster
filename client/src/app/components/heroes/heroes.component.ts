import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, ICellRendererParams, SideBarDef } from 'ag-grid-community';
import { combineLatest, map, Observable } from 'rxjs';
import { HeroService } from '../../services/hero.service';
import { ItemPopularityService } from '../../services/item-popularity.service';
import { Hero } from '../../types/hero.type';
import { ItemPopularity } from '../../types/item-popularity.type';
import { Item } from '../../types/item.type';

@Component({
  selector: 'app-heroes',
  imports: [AgGridAngular],
  providers: [],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
})
export class HeroesComponent implements OnInit {
  public heroes$: Observable<Hero[]>;
  public itemPopularity$: Observable<ItemPopularity[]>;
  public itemNames$: Observable<{ [name: string]: Item }>;
  public mappedItemNames: { [name: string]: Item } = {};

  public defaultColDef: ColDef = {
    editable: true,
    filter: true,
    enablePivot: true,
    enableRowGroup: true,
    enableValue: true,
  };

  public pagination = true;
  public paginationPageSize = 10;
  public paginationPageSizeSelector = [10, 25, 50, 100];

  public rowData: {
    hero: string;
    winRate: number;
    startingItems: { key: string; value: number; item: Item }[];
    earlyItems: { key: string; value: number; item: Item }[];
    midItems: { key: string; value: number; item: Item }[];
    lateItems: { key: string; value: number; item: Item }[];
  }[] = [];

  public colDefs: ColDef[] = [
    { field: 'hero', headerName: 'Hero', width: 150, filter: true },
    {
      field: 'winRate',
      headerName: 'Win Rate',
      valueFormatter: (params) => `${params.value} %`,
      width: 150,
      filter: true,
    },
    {
      field: 'startingItems',
      headerName: 'Starting Items',
      cellRenderer: this.itemCellRenderer.bind(this),
      width: 210,
      autoHeight: true,
      filter: false,
      cellStyle: {
        display: 'flex',
      },
    },
    {
      field: 'earlyItems',
      headerName: 'Early Game Items',
      cellRenderer: this.itemCellRenderer.bind(this),
      width: 210,
      filter: false,
      autoHeight: true,
      cellStyle: {
        display: 'flex',
      },
    },
    {
      field: 'midItems',
      headerName: 'Mid Game Items',
      filter: false,
      cellRenderer: this.itemCellRenderer.bind(this),
      width: 210,
      autoHeight: true,
      cellStyle: {
        display: 'flex',
      },
    },
    {
      field: 'lateItems',
      headerName: 'Late Game Items',
      filter: false,
      cellRenderer: this.itemCellRenderer.bind(this),
      width: 210,
      autoHeight: true,
      cellStyle: {
        display: 'flex',
      },
    },
  ];

  private imgUrl = 'https://cdn.cloudflare.steamstatic.com';
  constructor(
    private readonly heroesService: HeroService,
    private readonly itemPopularityService: ItemPopularityService
  ) {
    this.heroes$ = this.heroesService.getHeroes();

    this.itemPopularity$ = this.itemPopularityService.getItemPopularity();
    this.itemNames$ = this.itemPopularityService.getItemNames();
  }

  ngOnInit(): void {
    this.itemNames$.subscribe((itemNames) => {
      this.mappedItemNames = itemNames;

      combineLatest([this.itemPopularity$, this.heroes$])
        .pipe(
          map(([itemPopularities, heroes]) => {
            const heroMap = new Map(heroes.map((hero) => [hero.id, hero]));

            return itemPopularities.map((item) => {
              const hero = heroMap.get(item.hero.id);

              return {
                hero: item.hero.localizedName,
                winRate: hero?.winRate || 0,
                startingItems: this.getItemEntries(item.startGameItems),
                earlyItems: this.getItemEntries(item.earlyGameItems),
                midItems: this.getItemEntries(item.midGameItems),
                lateItems: this.getItemEntries(item.lateGameItems),
              };
            });
          })
        )
        .subscribe((formattedData) => {
          this.rowData = formattedData;
        });
    });
  }

  itemCellRenderer(params: ICellRendererParams): string {
    const items =
      (params.value as { key: string; value: number; item: Item }[]) || [];

    if (!items || items.length === 0) return '';

    let html = '<div class="item-container">';
    items.forEach((itemObj) => {
      if (itemObj?.item?.img) {
        html += `
          <div class="item-entry">
            <img src="${this.imgUrl}${itemObj.item.img}" alt="${itemObj.item.dname}" width="35" height="23" />
            <div class="item-details">
            </div>
          </div>
        `;
      }
    });
    html += '</div>';

    return html;
  }

  getItemEntries(
    items: Record<string, number>
  ): { key: string; value: number; item: Item }[] {
    if (!items) return [];

    return Object.entries(items)
      .sort(([, valueA], [, valueB]) => valueB - valueA)
      .slice(0, 4)
      .map(([key, value]) => {
        const item = this.findItemName(Number(key));
        if (!item) {
          throw new Error(`Item with ID ${key} not found`);
        }
        return { key, value, item };
      });
  }

  findItemName(itemId: number): Item | undefined {
    if (!this.mappedItemNames) return;

    return Object.values(this.mappedItemNames).find(
      (item) => item.id === itemId
    );
  }
}

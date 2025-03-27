import { AsyncPipe } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { combineLatest, map, Observable } from 'rxjs';
import { HeroService } from '../../services/hero.service';
import { ItemPopularityService } from '../../services/item-popularity.service';
import { Hero } from '../../types/hero.type';
import { ItemPopularity } from '../../types/item-popularity.type';
import { Item } from '../../types/item.type';

@Component({
  selector: 'app-heroes',
  imports: [AsyncPipe, AgGridAngular],
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

  rowData: {
    hero: string;
    startingItems: { key: string; value: number; item: Item }[];
    earlyItems: { key: string; value: number; item: Item }[];
    midItems: { key: string; value: number; item: Item }[];
    lateItems: { key: string; value: number; item: Item }[];
  }[] = [];

  colDefs: ColDef[] = [
    { field: 'hero', headerName: 'Hero', width: 150 },
    {
      field: 'startingItems',
      headerName: 'Starting Items',
      cellRenderer: this.itemCellRenderer.bind(this),
      flex: 1,
      autoHeight: true,
    },
    {
      field: 'earlyItems',
      headerName: 'Early Game Items',
      cellRenderer: this.itemCellRenderer.bind(this),
      flex: 1,
      autoHeight: true,
    },
    {
      field: 'midItems',
      headerName: 'Mid Game Items',
      cellRenderer: this.itemCellRenderer.bind(this),
      flex: 1,
      autoHeight: true,
    },
    {
      field: 'lateItems',
      headerName: 'Late Game Items',
      cellRenderer: this.itemCellRenderer.bind(this),
      flex: 1,
      autoHeight: true,
    },
  ];

  public imgUrl = 'https://cdn.cloudflare.steamstatic.com';
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
      console.log(itemNames);

      this.itemPopularity$
        .pipe(
          map((itemPopularity) => {
            return itemPopularity.map((item) => {
              return {
                hero: item.hero.localizedName,
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
            <img src="${this.imgUrl}${itemObj.item.img}" alt="${itemObj.item.dname}" width="40" height="30" />
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

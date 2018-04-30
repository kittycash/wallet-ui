import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { WalletAppComponent } from './wallet_app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { AddressPanelComponent } from './components/wallet/address-panel/address-panel.component';
import { CreateWalletComponent } from './components/create-wallet/create-wallet.component';
import { SetupComponent } from './components/create-wallet/setup/setup.component';
import { WarningComponent } from './components/create-wallet/warning/warning.component';
import { ShowSeedComponent } from './components/create-wallet/show-seed/show-seed.component';
import { ConfirmSeedComponent } from './components/create-wallet/confirm-seed/confirm-seed.component';
import { FeedComponent } from './components/feed/feed.component';
import { EquipComponent } from './components/equip/equip.component';
import { BreedComponent } from './components/breed/breed.component';
import { KittenDetailComponent } from './components/kitten-detail/kitten-detail.component';
import { CatBoxComponent } from './components/catbox/catbox.component';
import { ItemBoxComponent } from './components/itembox/itembox.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { ApiService, AppService, WalletService } from './services';
import { HttpClientModule } from '@angular/common/http';
import './rxjs-operators';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SatoshiPipe } from './components/catbox/coin_converter.pipe';
import { DropletsPipe } from './components/catbox/coin_converter.pipe';
import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
  declarations: [
    WalletAppComponent,
    SidebarComponent,
    WalletComponent,
    AddressPanelComponent,
    CreateWalletComponent,
    SetupComponent,
    WarningComponent,
    ShowSeedComponent,
    ConfirmSeedComponent,
    FeedComponent,
    EquipComponent,
    BreedComponent,
    KittenDetailComponent,
    CatBoxComponent,
    ItemBoxComponent,
    SatoshiPipe,
    DropletsPipe
  ],
  entryComponents: [
    CreateWalletComponent,
    BreedComponent,
    FeedComponent,
    EquipComponent,
    AddressPanelComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    NgxQRCodeModule
  ],
  providers: [
    AppService,
    ApiService,
    WalletService,
  ],
  exports: [
    WalletAppComponent,
    SatoshiPipe,
    DropletsPipe
  ],
  bootstrap: [WalletAppComponent]
})
export class WalletAppModule { }

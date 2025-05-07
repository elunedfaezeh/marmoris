import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { MegaMenuModule } from 'primeng/megamenu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SidebarModule } from 'primeng/sidebar';
import { CardModule } from 'primeng/card';
import { StepperModule } from 'primeng/stepper';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DividerModule } from 'primeng/divider';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { BadgeModule } from 'primeng/badge';
import { SliderModule } from 'primeng/slider';
import { TabMenuModule } from 'primeng/tabmenu';
import { InplaceModule } from 'primeng/inplace';
import { ListboxModule } from 'primeng/listbox';
import { AvatarModule } from 'primeng/avatar';
import { DataViewModule } from 'primeng/dataview';
import { SplitterModule } from 'primeng/splitter';
import { OrderListModule } from 'primeng/orderlist';
import { TimelineModule } from 'primeng/timeline';
import { ScrollTopModule } from 'primeng/scrolltop';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ScrollerModule } from 'primeng/scroller';
import { InputOtpModule } from 'primeng/inputotp';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ChipsModule } from 'primeng/chips';
import { SelectButtonModule } from 'primeng/selectbutton';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { ChartModule } from 'primeng/chart';
import { TabViewModule } from 'primeng/tabview';
import { RatingModule } from 'primeng/rating';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CheckboxModule } from 'primeng/checkbox';
import { GalleriaModule } from 'primeng/galleria';
import { TagModule } from 'primeng/tag';
import { AccordionModule } from 'primeng/accordion';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FieldsetModule } from 'primeng/fieldset';
import { RippleModule } from 'primeng/ripple';
import { InputNumberModule } from 'primeng/inputnumber';
import { CarouselModule } from 'primeng/carousel';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MenubarModule } from 'primeng/menubar';
import { StepsModule } from 'primeng/steps';
import { MenuModule } from 'primeng/menu';
let list = [
  ProgressSpinnerModule,
  MenubarModule,
  InplaceModule,
  ListboxModule,
  OrderListModule,
  ScrollTopModule,
  ButtonModule,
  ToolbarModule,
  MegaMenuModule,
  PanelMenuModule,
  SidebarModule,
  CardModule,
  StepperModule,
  TimelineModule,
  ChartModule,
  MessageModule,
  AvatarModule,
  DataViewModule,
  SplitterModule,
  InputOtpModule,
  TabMenuModule,
  MegaMenuModule,
  AutoCompleteModule,
  SliderModule,
  ScrollPanelModule,
  ScrollerModule,
  BreadcrumbModule,
  DividerModule,
  BadgeModule,
  CardModule,
  SidebarModule,
  PanelMenuModule,
  ButtonModule,
  ToolbarModule,
  TableModule,
  DialogModule,
  TableModule,
  ConfirmDialogModule,
  DynamicDialogModule,
  ChipsModule,
  SelectButtonModule,
  ToastModule,
  FileUploadModule,
  TabViewModule,
  RatingModule,
  DropdownModule,
  MultiSelectModule,
  InputSwitchModule,
  CheckboxModule,
  GalleriaModule,
  TagModule,
  AccordionModule,
  ToggleButtonModule,
  FieldsetModule,
  RippleModule,
  InputNumberModule,
  CarouselModule,
  FloatLabelModule,
  StepsModule,
  MenuModule
];
exports: [
  StepsModule,  
  ButtonModule,
  TableModule,

]
@NgModule({
  declarations: [],
  imports: list,
  exports: list,
})

export class PrimengModule { }

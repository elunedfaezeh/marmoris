import { Component, OnInit } from '@angular/core';
import { PrimengModule } from '../../../primeng.module';
import { LayoutService } from '../../layout.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [PrimengModule, FormsModule, ReactiveFormsModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  providers: [MessageService]
})
export class FooterComponent implements OnInit {

  form: FormGroup | any;

  constructor(private service: LayoutService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.createform();
  }
  createform() {
    this.form = new FormGroup({
      mobile: new FormControl(null, [Validators.required, Validators.pattern("(09)[0-9]{9}")])
    })
  }
  addUser(): void {
    if (this.form.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: ' شماره را بدرستی وارد کنید  .',
      });
    } else if (this.form.controls.mobile.value == null) {
      this.messageService.add({
        severity: 'error',
        summary: ' شماره همراه را وارد کنید  .',
      });
    } else {
      this.service.authUser(this.form.value).subscribe((response: any) => {
        if (response['success'] === true) {
          this.messageService.add({ severity: 'success', summary: 'با موفقیت انجام شد', sticky: true });
        } else {
          this.messageService.add({ severity: 'error', summary: 'خطا در عضویت ', sticky: true });
        }
      });

    }

  }
}


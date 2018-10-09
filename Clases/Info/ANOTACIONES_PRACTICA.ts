// COMANDOS
    npm install
    npm update 
    npm uninstall --save-dev @angular-cli
    npm install --save -dev @angular/cli@latest --> para corregir la versiòn
    --> error angular.js
    ng update @angular/cli
    ng update @angular/core --next --force

    ng generate component my-new-component 
    ng generate service my-new-service

// ROUTER
    import { Routes, RouterModule } from '@angular/router';

    const routes: Routes = [   
        {path: '', redirectTo: '/items', pathMatch: 'full' },
        {path: 'items', component: ItemsComponent},
        {path: '**',    redirectTo: '/items', pathMatch: 'full'} 
        ]; 

    @NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule], 
        providers: []
        }) 

// COMPONENTES
        COMPUESTO POR
            TEMPLATE (HTML)
            METADATA (ENTRE EL HTML Y EL TS)
                @Component el mas comun
                Configuracion
                    selector
                    templateUrl
                    styles
                    styleUrls
                    animations
                    @Component({
                     selector: 'app-items',
                     templateUrl: './items.component.html',
                     styleUrls: ['./items.component.css']
                     })
            CLASS (TS)

//DATA BINDING
    <h1>{{title}}</h1>
    <p>{{body}}</p>
    <hr/>
    <experiment *ngFor="let e of experiments" [experiment]="e"></experiment>
    <hr/>
    <div>
        <h2 class="text-error">Experiments: {{message}}</h2>
            <form class="form-inline">
                <input type="text" [(ngModel)]="message" placeholder="Message">
                <button type="submit" class="btn" (click)="updateMessage(message)">Update Message</button>
            </form>
    </div>

//CICLO DE VIDA DEL COMPONENTE
    •ngOnChanges            --> called when an input or output binding value changes 
    •ngOnInit               --> called after the ﬁrst ngOnChanges 
    •ngDoCheck              --> handles developer's custom change detection 
    •ngAfterContentInit     --> called after component content initialized 
    •ngAfterContentChecked  --> called after every check of component content
    •ngAfterViewInit        --> called after component's view(s) are initialized 
    •ngAfterViewChecked     --> called after every check of a component's view(s) 
    •ngOnDestroy            --> called just before the directive is destroyed.

//DIRECTIVAS ESTRUCTURALES
    --> AGREGAn o sacan elementos del DOM
    --> Con * se indica que la directiva modifica al HTML
    --> Ejemplo
            //IF
            <div *ngIf="hero">{{hero}}</div>
            //FOR
            <div *ngFor="let hero of heroes">{{hero}}</div>
            //SWITCH
            <span [ngSwitch]="toeChoice">
                <span *ngSwitchCase="'Eenie'">Eenie</span>
                <span *ngSwitchCase="'Meanie'">Meanie</span>
                <span *ngSwitchCase="'Miney'">Miney</span>
                <span *ngSwitchCase="'Moe'">Moe</span>
                <span *ngSwitchDefault>other</span>
            </span>

//CONTRATO ENTRE COMPONENTE
    --> Representa el acuerdo entre el que consume y el que provee
    --> Contrato con cualquier componente que quiera consumirlo
    --> Input y Output definen la INTERFACE del componente
        --> @Input
            --> Definido dentro del componente : @Input() someValue: string;
            --> Bind en Template: <component [someValue]="value"></component> 
        --> @Output
            --> Expone una propiedad EventEmitter al padre
            --> Definido dentro del comp: @Output() showValue = new EventEmitter();
            --> Bind en Template: <cmp (showValue)="handleValue()"></cmp>
        TEMPLATE --> @Output --> CLASS
        TEMPLATE <-- @Input  <-- CLASS

        <app-items-list [items]="items"
                        (selected)="selectItem($event)"
                        (deleted)="deleteItem($event)">
        </app-items-list>

//BINDINGS
    --> Para comunicarse entre la clase y el template 

        TEMPLATE                                  CLASS
                 <-- {{value}}
                 <-- [property]="value"
                            (event)="handler" -->
                 <-- [(ngModel)] = "property" -->

    Property binding        
        --> Del componente al elemento
        --> Creado con [] <img [src]=”image.src” /> 
        [attr.property], 
        [class.className], 
        [style.styleName] 
        --> Ejemplo 
        <span [style.color]="componentStyle">Some colored text!</span>
   
    Event binding
        --> Elemento --> Data () (click) --> Componente function($event)
        <button (click)="alertTheWorld($event)">Click me!</button>
    
    Two way binding
        --> Usado con ngModel
        <label>The awesome input</label>
        <input [(ngModel)]="dynamicValue" placeholder="Watch the text update!" type="text">
        <label>The awesome output</label>
        <span>{{dynamicValue}}</span>
    
        -->Variables locales
            --> Usadas con #
            --> Se pueden utilizar en todo el html
            --> Ejemplo 
                 <form novalidate #formRef="ngForm">
                    <label>Item Name</label>
                    <input [(ngModel)]="selectedItem.name"
                        type="text" name="name" required
                        placeholder="Enter a name">
                    
                    <label>Item Description</label>
                    <input [(ngModel)]="selectedItem.description"
                        type="text" name="description"
                        placeholder="Enter a description">
        
                    <button type="submit"
                        [disabled]="!formRef.valid"
                        (click)="saved.emit(selectedItem)">Save</button>
                 </form>


//FORMULARIOS POR PLANTILLA EJEMPLOS DE VALIDACION
    --> FormsModule de angular
        import { BrowserModule } from '@angular/platform-browser';
        import { NgModule } from '@angular/core';
        import { FormsModule } from '@angular/forms';
        --> ngModel 
            --> Habilita el two way binding dentro de un form
            --> Crea instancia Form Control 
            --> Ejemplo
                    <input [(ngModel)]="selectedItem.name"
                    name="name" #nameRef="ngModel"
                    placeholder="Enter a name"
                    type="text">

    --> Form Control 
        --> ngForm      --> pasado como "parametro"  #formRef="ngForm">
            <form novalidate #formRef="ngForm">
                <div>
                    <label>Item Name</label>
                    <input [(ngModel)]="selectedItem.name"
                        name="name" required
                        placeholder="Enter a name" type="text">
                </div>
                <div>
                    <label>Item Description</label>
                    <input [(ngModel)]="selectedItem.description"
                        name="description"
                        placeholder="Enter a description" type="text">
                </div>
            </form>

            <pre>{{formRef.value | json}}</pre>
            <pre>{{formRef.valid | json}}</pre>
            //RES
            {
                "name": "First Item",
                "description": "Item Description"
            }
            true
        
        --> ngModelGroup--> para crear entidades
            <form novalidate #formRef="ngForm">
                <fieldset ngModelGroup="user">
                <label>First Name</label>
                <input [(ngModel)]="user.firstName"
                    name="firstName" required
                    placeholder="Enter your first name" type="text">
                <label>Last Name</label>
                <input [(ngModel)]="user.lastName"
                    name="lastName" required
                    placeholder="Enter your last name" type="text">
                </fieldset>
            </form>

    --> Validation Styles
        --> Segun si es valido o no adjunta variables para poner en CSS estilos
        
        input.ng-invalid {
            border-bottom: 1px solid red;
           }

        input.ng-valid {
            border-bottom: 1px solid green;
           }

//COMUNICACION CON SERVIDORES - HTTP MODULO

//HTTP MODULO
    --> Uso de XHR y APIs JSON
    --> RestFull Verbs
    --> import { HttpModule } from '@angular/http';
    --> Metodos y como accederlos
       //GET
       loadItems() {
        return this.http.get(BASE_URL)
        .map(res => res.json())
        .toPromise();
       }
            //LLAMADO CON THEN Y CATCH
                constructor(private itemsService: ItemsService) {}
                ngOnInit() {
                this.itemsService.loadItems()
                .then(items => this.items = items);
                }
       //POST
       createItem(item: Item) {
        return this.http.post(`${BASE_URL}`
       , JSON.stringify(item), HEADER)
        .map(res => res.json())
        .toPromise();
       }
       //UPDATE
       updateItem(item: Item) {
        return this.http.put(`${BASE_URL}${item.id}`
       , JSON.stringify(item), HEADER)
        .map(res => res.json())
        .toPromise();
       }
       //DELETE
       deleteItem(item: Item) {
        return this.http.delete(`${BASE_URL}${item.id}`)
        .map(res => res.json())
        .toPromise();
       }

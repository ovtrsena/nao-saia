import { Location, PopStateEvent } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { User } from './../../domain/User';
import { UserService } from './../../services/user.service';
import { UserlogedNotificationService } from './../../services/userloged-notification.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    
    public isCollapsed = true;
    private lastPoppedUrl: string;
    private yScrollStack: number[] = [];

    socialMedias: any;
    menu: any;
    logged: boolean;
    userLogged: any;

    constructor(public location: Location, 
        private router: Router, 
        private route: ActivatedRoute, 
        private userService: UserService,
        private userLogedNotification: UserlogedNotificationService) {
        this.loadMenu();
        this.loadSocialMedias();
        this.userLogedNotification.notifier.subscribe((userLogged: User) => {
            this.userLogged = userLogged;
            this.logged = !!(userLogged && userLogged.id);
        });
    }

    ngOnInit() {
      this.router.events.subscribe((event) => {
        this.isCollapsed = true;
        if (event instanceof NavigationStart) {
           if (event.url != this.lastPoppedUrl)
               this.yScrollStack.push(window.scrollY);
       } else if (event instanceof NavigationEnd) {
           if (event.url == this.lastPoppedUrl) {
               this.lastPoppedUrl = undefined;
               window.scrollTo(0, this.yScrollStack.pop());
           } else
               window.scrollTo(0, 0);
       }
     });
     this.location.subscribe((ev:PopStateEvent) => {
         this.lastPoppedUrl = ev.url;
     });
    }

    isHome() {
        var titlee = this.location.prepareExternalUrl(this.location.path());

        if( titlee === '#/home' ) {
            return true;
        }
        else {
            return false;
        }
    }
    isDocumentation() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if( titlee === '#/documentation' ) {
            return true;
        }
        else {
            return false;
        }
    }

    loadMenu() {
        this.menu = {
            categories: [
                {
                    name: "Farmácias",
                    description: "Encontre Farmácias com delivery abertos.",
                    ref: "estabelecimento/famarcias",
                    icon: "ni ni-ambulance"
                },
                {
                    name: "Supermercados",
                    description: "Encontre Supermercados com delivery abertos.",
                    ref: "estabelecimento/supermercados",
                    icon: "ni ni-cart"
                },
                {
                    name: "Lanchonetes",
                    description: "Encontre Restaurantes/Lanchonetes com delivery abertos.",
                    ref: "estabelecimento/lanchonetes",
                    icon: "ni ni-delivery-fast"
                },
                {
                    name: "Restaurantes",
                    description: "Encontre Restaurantes com delivery abertos.",
                    ref: "estabelecimento/restaurantes",
                    icon: "ni ni-delivery-fast"
                },
                {
                    name: "Outros",
                    description: "Encontre outros estabalecimentos.",
                    ref: "estabelecimento",
                    icon: "ni ni-square-pin"
                },
            ]
        };
    }

    loadSocialMedias() {
        this.socialMedias = {
            github: 'b0nn13/nao-saia',
            instagram: '@naosaia',
            facebook: '@naosaia',
            linkedin: '@naosaia',
            twitter: '@naosaia'
        };
    }

    logout(): void {
        this.userService.logout().subscribe(() => {
            this.userLogged = null;
            this.logged = false;
            this.router.navigate([`/home`]);
        });
    }
}

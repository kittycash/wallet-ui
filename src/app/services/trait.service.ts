import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import { ApiService } from './api.service';

@Injectable()
export class TraitService {
  
  traits: any = false;
  private walletUrl: string = 'http://127.0.0.1:6148/';
 
  constructor(private apiService: ApiService) {
    this.apiService.getTraits().subscribe(traits => {
      this.traits = traits;  
    });
  }

  traitImage(icon:string)
  {
    return this.walletUrl + icon;
  }

  lookup(phenotypes:any)
  {
    let formatted_traits = [];

    for (let property in phenotypes) {     
      if (phenotypes.hasOwnProperty(property)) {
          
          let formatted_property = this.camelCaseTo_underscore(property);

          if (this.traits.hasOwnProperty(formatted_property) && this.validPropertyForColorScheme(formatted_property, phenotypes.BodyColorScheme.String))
          {
            let trait_container = this.traits[formatted_property];

            let trait_id = phenotypes[property];

            if (trait_container && trait_id && trait_container[trait_id])
            {
              //Add the trait type
              let t = trait_container[trait_id];
              t.type = formatted_property;
               formatted_traits.push(t); 
            }
          }
      }
  }

    return this.sortTraits(formatted_traits);
  }

  private validPropertyForColorScheme(property:any, color_scheme:any)
  {
    const a_only_schemes = [
      'mono_a', 
      'mono_b'
    ];

    const a_c_schemes = [
      'dual_a'
    ];

    if (a_only_schemes.indexOf(color_scheme) > -1)
    {
      switch(property) {
        case 'body_color_b':
            return false;
        case 'body_color_c':
            return false;
        case 'body_pattern':
            return false;
      }
    }

    if (a_c_schemes.indexOf(color_scheme) > -1)
    {
      switch(property) {
        case 'body_color_b':
            return false;
        case 'body_pattern':
            return false;
      }
    }
    

    return true;
  }

  private sortTraits(traits:any)
  {
    let trait_order = ['body_attr', 'body_pattern', 'eye_attr', 'nose_attr', 'tail_attr'];

    let result = traits.map(function(trait:any) {
        var s = trait_order.indexOf(trait.type);
        //If the trait isn't defined, push to the bottom of the array
        if (s <= 0)
        {
          s = 99999;
        }
        trait_order[s] = '';
        return [s, trait]
    }).sort().map(function(o:any) { return o[1] });

    return result;
  }

  private camelCaseTo_underscore(key:any)
  {
    return key.replace(/(?:^|\.?)([A-Z])/g, function (x:any,y:any){return "_" + y.toLowerCase()}).replace(/^_/, "");
  }
}

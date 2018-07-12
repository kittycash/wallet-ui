import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import { ApiService } from './api.service';

@Injectable()
export class TraitService {

  // traits: any = {"tail_attr":{"0":{"icon":"/v1/trait_image/tail_attr/chipmunk","displayName":"chipmunk"},"1":{"displayName":"comma","icon":"/v1/trait_image/tail_attr/comma"},"2":{"displayName":"cub","icon":"/v1/trait_image/tail_attr/cub"},"3":{"displayName":"fire","icon":"/v1/trait_image/tail_attr/fire"},"4":{"icon":"/v1/trait_image/tail_attr/fluffy","displayName":"fluffy"},"5":{"displayName":"hare","icon":"/v1/trait_image/tail_attr/hare"},"6":{"displayName":"jerboa","icon":"/v1/trait_image/tail_attr/jerboa"},"7":{"icon":"/v1/trait_image/tail_attr/rainbow","displayName":"rainbow"},"8":{"displayName":"sharp","icon":"/v1/trait_image/tail_attr/sharp"},"9":{"icon":"/v1/trait_image/tail_attr/squirrel","displayName":"squirrel"}},"body_color_b":{"0":{"icon":"/v1/trait_image/body_color_b/aqua","displayName":"aqua"},"1":{"displayName":"aquamarineDark","icon":"/v1/trait_image/body_color_b/aquamarineDark"},"2":{"displayName":"babyBlue","icon":"/v1/trait_image/body_color_b/babyBlue"},"3":{"displayName":"burntSiennaDark","icon":"/v1/trait_image/body_color_b/burntSiennaDark"},"4":{"icon":"/v1/trait_image/body_color_b/burntSiennaLight","displayName":"burntSiennaLight"},"5":{"displayName":"grasslight","icon":"/v1/trait_image/body_color_b/grasslight"},"6":{"displayName":"gray","icon":"/v1/trait_image/body_color_b/gray"},"7":{"displayName":"jade","icon":"/v1/trait_image/body_color_b/jade"},"8":{"displayName":"limeLight","icon":"/v1/trait_image/body_color_b/limeLight"},"9":{"displayName":"linenDark","icon":"/v1/trait_image/body_color_b/linenDark"},"10":{"icon":"/v1/trait_image/body_color_b/peruPale","displayName":"peruPale"},"11":{"icon":"/v1/trait_image/body_color_b/princessPink","displayName":"princessPink"},"12":{"icon":"/v1/trait_image/body_color_b/rosyBrown","displayName":"rosyBrown"},"13":{"displayName":"sandyBrown","icon":"/v1/trait_image/body_color_b/sandyBrown"},"14":{"icon":"/v1/trait_image/body_color_b/sienna","displayName":"sienna"},"15":{"icon":"/v1/trait_image/body_color_b/silver","displayName":"silver"},"16":{"icon":"/v1/trait_image/body_color_b/springDark","displayName":"springDark"},"17":{"displayName":"springGreen","icon":"/v1/trait_image/body_color_b/springGreen"},"18":{"icon":"/v1/trait_image/body_color_b/steelBlue","displayName":"steelBlue"},"19":{"icon":"/v1/trait_image/body_color_b/steelGray","displayName":"steelGray"},"20":{"icon":"/v1/trait_image/body_color_b/steelPale","displayName":"steelPale"},"21":{"displayName":"thistle","icon":"/v1/trait_image/body_color_b/thistle"},"22":{"displayName":"thistlePale","icon":"/v1/trait_image/body_color_b/thistlePale"},"23":{"displayName":"vermilionDark","icon":"/v1/trait_image/body_color_b/vermilionDark"},"24":{"icon":"/v1/trait_image/body_color_b/yellow","displayName":"yellow"}},"ear_attr":{"0":{"displayName":"canine","icon":"/v1/trait_image/ear_attr/canine"},"1":{"displayName":"default","icon":"/v1/trait_image/ear_attr/default"},"2":{"icon":"/v1/trait_image/ear_attr/gremlin","displayName":"gremlin"},"3":{"icon":"/v1/trait_image/ear_attr/husky","displayName":"husky"},"4":{"icon":"/v1/trait_image/ear_attr/infernal","displayName":"infernal"},"5":{"displayName":"pork","icon":"/v1/trait_image/ear_attr/pork"},"6":{"displayName":"tiger","icon":"/v1/trait_image/ear_attr/tiger"},"7":{"displayName":"vinny","icon":"/v1/trait_image/ear_attr/vinny"},"8":{"icon":"/v1/trait_image/ear_attr/wolfish","displayName":"wolfish"}},"nose_attr":{"0":{"displayName":"amazed","icon":"/v1/trait_image/nose_attr/amazed"},"1":{"displayName":"sour","icon":"/v1/trait_image/nose_attr/sour"},"2":{"icon":"/v1/trait_image/nose_attr/square","displayName":"square"},"3":{"icon":"/v1/trait_image/nose_attr/dozy","displayName":"dozy"},"4":{"displayName":"gamine","icon":"/v1/trait_image/nose_attr/gamine"},"5":{"displayName":"glad","icon":"/v1/trait_image/nose_attr/glad"},"6":{"displayName":"hipster","icon":"/v1/trait_image/nose_attr/hipster"},"7":{"displayName":"humble","icon":"/v1/trait_image/nose_attr/humble"},"8":{"displayName":"normal","icon":"/v1/trait_image/nose_attr/normal"},"9":{"icon":"/v1/trait_image/nose_attr/sour","displayName":"sour"},"10":{"icon":"/v1/trait_image/nose_attr/square","displayName":"square"},"11":{"icon":"/v1/trait_image/nose_attr/tusk","displayName":"tusk"}},"body_color_a":{"0":{"displayName":"lightCyan","icon":"/v1/trait_image/body_color_a/lightCyan"},"1":{"displayName":"lightGray","icon":"/v1/trait_image/body_color_a/lightGray"},"2":{"displayName":"mistyRose","icon":"/v1/trait_image/body_color_a/mistyRose"},"3":{"icon":"/v1/trait_image/body_color_a/moccasin","displayName":"moccasin"},"4":{"displayName":"paleBlue","icon":"/v1/trait_image/body_color_a/paleBlue"},"5":{"displayName":"paleTurquoise","icon":"/v1/trait_image/body_color_a/paleTurquoise"},"6":{"icon":"/v1/trait_image/body_color_a/powderGrass","displayName":"powderGrass"},"7":{"icon":"/v1/trait_image/body_color_a/thistlePale","displayName":"thistlePale"},"8":{"displayName":"white","icon":"/v1/trait_image/body_color_a/white"},"9":{"displayName":"yellowlight","icon":"/v1/trait_image/body_color_a/yellowlight"}},"eye_attr":{"0":{"icon":"/v1/trait_image/eye_attr/ardent","displayName":"ardent"},"1":{"displayName":"astonished","icon":"/v1/trait_image/eye_attr/astonished"},"2":{"displayName":"cunning","icon":"/v1/trait_image/eye_attr/cunning"},"3":{"icon":"/v1/trait_image/eye_attr/faithful","displayName":"faithful"},"4":{"icon":"/v1/trait_image/eye_attr/indifferent","displayName":"indifferent"},"5":{"displayName":"persistent","icon":"/v1/trait_image/eye_attr/persistent"},"6":{"displayName":"pleasant","icon":"/v1/trait_image/eye_attr/pleasant"},"7":{"icon":"/v1/trait_image/eye_attr/pretty","displayName":"pretty"},"8":{"icon":"/v1/trait_image/eye_attr/strict","displayName":"strict"},"9":{"displayName":"strong","icon":"/v1/trait_image/eye_attr/strong"},"10":{"icon":"/v1/trait_image/eye_attr/stupid","displayName":"stupid"},"11":{"icon":"/v1/trait_image/eye_attr/surprised","displayName":"surprised"}},"body_color_c":{"0":{"displayName":"amaranthLight","icon":"/v1/trait_image/body_color_c/amaranthLight"},"1":{"icon":"/v1/trait_image/body_color_c/blueViolet","displayName":"blueViolet"},"2":{"displayName":"boldKhaki","icon":"/v1/trait_image/body_color_c/boldKhaki"},"3":{"displayName":"buff","icon":"/v1/trait_image/body_color_c/buff"},"4":{"displayName":"babyBlue","icon":"/v1/trait_image/body_color_c/babyBlue"},"5":{"displayName":"babyRose","icon":"/v1/trait_image/body_color_c/babyRose"},"6":{"displayName":"bitterSweet","icon":"/v1/trait_image/body_color_c/bitterSweet"},"7":{"icon":"/v1/trait_image/body_color_c/buff","displayName":"buff"},"8":{"icon":"/v1/trait_image/body_color_c/khaki","displayName":"khaki"},"9":{"displayName":"mediumPurple","icon":"/v1/trait_image/body_color_c/mediumPurple"},"10":{"displayName":"oliveLight","icon":"/v1/trait_image/body_color_c/oliveLight"},"11":{"icon":"/v1/trait_image/body_color_c/grassLight","displayName":"grassLight"},"12":{"displayName":"icterine","icon":"/v1/trait_image/body_color_c/icterine"},"13":{"displayName":"jasmine","icon":"/v1/trait_image/body_color_c/jasmine"},"14":{"displayName":"slateBlue","icon":"/v1/trait_image/body_color_c/slateBlue"},"15":{"displayName":"orangeBlond","icon":"/v1/trait_image/body_color_c/orangeBlond"},"16":{"icon":"/v1/trait_image/body_color_c/orangeTeaRose","displayName":"orangeTeaRose"},"17":{"displayName":"yellowGreen","icon":"/v1/trait_image/body_color_c/yellowGreen"},"18":{"displayName":"pink","icon":"/v1/trait_image/body_color_c/pink"},"19":{"icon":"/v1/trait_image/body_color_c/princessPink","displayName":"princessPink"},"20":{"displayName":"purple","icon":"/v1/trait_image/body_color_c/purple"},"21":{"displayName":"purpleLight","icon":"/v1/trait_image/body_color_c/purpleLight"},"22":{"displayName":"springGreen","icon":"/v1/trait_image/body_color_c/springGreen"},"23":{"displayName":"springLight","icon":"/v1/trait_image/body_color_c/springLight"}},"body_pattern":{"0":{"displayName":"candle","icon":"/v1/trait_image/body_pattern/candle"},"1":{"icon":"/v1/trait_image/body_pattern/dalmatian","displayName":"dalmatian"},"2":{"displayName":"fern","icon":"/v1/trait_image/body_pattern/fern"},"3":{"displayName":"ornament","icon":"/v1/trait_image/body_pattern/ornament"},"4":{"icon":"/v1/trait_image/body_pattern/pettyBig","displayName":"pettyBig"},"5":{"displayName":"pettySmall","icon":"/v1/trait_image/body_pattern/pettySmall"},"6":{"icon":"/v1/trait_image/body_pattern/reptilian","displayName":"reptilian"},"7":{"displayName":"seed","icon":"/v1/trait_image/body_pattern/seed"},"8":{"icon":"/v1/trait_image/body_pattern/spotted","displayName":"spotted"},"9":{"displayName":"striped","icon":"/v1/trait_image/body_pattern/striped"},"10":{"displayName":"tropical","icon":"/v1/trait_image/body_pattern/tropical"},"11":{"icon":"/v1/trait_image/body_pattern/wildfire","displayName":"wildfire"}},"body_attr":{"0":{"icon":"/v1/trait_image/body_attr/bonfireA","displayName":"bonfireA"},"1":{"displayName":"bonfireB","icon":"/v1/trait_image/body_attr/bonfireB"},"2":{"displayName":"doubleBun","icon":"/v1/trait_image/body_attr/doubleBun"},"3":{"displayName":"ponytail","icon":"/v1/trait_image/body_attr/ponytail"}}};
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

          if (this.traits.hasOwnProperty(formatted_property))
          {
            let trait_container = this.traits[formatted_property];

            let trait_id = phenotypes[property];

            if (trait_container && trait_id && trait_container[trait_id])
            {
               formatted_traits.push(trait_container[trait_id]); 
            }
          }
      }
  }

    return formatted_traits;
  }

  private camelCaseTo_underscore(key)
  {
    return key.replace(/(?:^|\.?)([A-Z])/g, function (x,y){return "_" + y.toLowerCase()}).replace(/^_/, "");
  }
}

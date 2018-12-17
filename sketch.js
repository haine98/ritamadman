import processing.pdf.*;
import rita.*;
PFont font;
int count = 0;
RiGrammar rg1;
RiGrammar rg2;
RiGrammar rg3;
float speed;
 
String[] numerics = {
  "1 and a half ",
  "2 ",
  "2 and a half ",
  "3 ",
  "3 and a half ",
  "4 ",
  "4 and a half ",
  "5 ",
  "5 and a half ",
  "6 ", 
  "6 and a half ",
  "50 ",
  "100 ",
  "1000 ",
  "500 ",
  "5000 ",
  "10 and a half ",
  "50 and a half ",
  "A quarter ",
  "A third "
};
 
String[] measurement = {
  "tablespoons of",
  "teaspoons of",
  "grams of",
  "liters of",
  "kilograms of",
  "fluid ounces of",
  "cups of",
  "pints of",
  "quarts of",
  "gallons of"
};
 
 
void setup()
{
  font = createFont("AlexandriaFLF.ttf", 12);
  textFont(font);
  size(432, 648, PDF, "chaine.pdf"); //6 x 9
  fill(0);
 
}
 
void draw()
{ 
  PGraphicsPDF pdf = (PGraphicsPDF) g;
  PGraphics maskImage;
  PGraphics sourceImage;
  StringList all_ingredients;
  all_ingredients = new StringList();
  int num_ingredients = int(random(4, 9));
  int count2;
  String final_string = "";
  String title = "";
  //int count3;
  for (count2 = 0; count2 < num_ingredients; count2++) {
    rg1 = new RiGrammar();
    rg1 = rg1.loadFrom("recipes.json", this);
 
    rg2 = new RiGrammar();
    rg2 = rg2.loadFrom("recipes2.json", this);
 
    rg3 = new RiGrammar();
    rg3 = rg3.loadFrom("recipetitle.json", this);
 
    String var1 = rg1.expand();
    String var11 = rg2.expand();
    String var111 = rg3.expand();
    String ingred = " ";
 
    int rand_ing = int(random(0, 5));
    if (rand_ing == 0) {
      ingred = ultra_soft_ingredients[int(random(0, ultra_soft_ingredients.length))];
    }
    else if (rand_ing == 1) {
      ingred = soft_ingredients[int(random(0, soft_ingredients.length))];
    }
    else if (rand_ing == 2) {
      ingred = neutral_ingredients[int(random(0, neutral_ingredients.length))];
    }
    else if (rand_ing == 3) {
      ingred = sharp_ingredients[int(random(0, sharp_ingredients.length))];
    }
    else if (rand_ing == 4) {
      ingred = ultra_sharp_ingredients[int(random(0, ultra_sharp_ingredients.length))];
    }
 
    int rand_ing2 = int(random(0, numerics.length));
    int rand_ing3 = int(random(0, measurement.length));
    String list_ing;
    list_ing = numerics[rand_ing2] + measurement[rand_ing3] + ingred;
 
    all_ingredients.append(list_ing);
 
    RiString var2;
    RiString var22;
    RiString var3;
    RiString var33;
 
    var2 = new RiString(var1);
    var22 = new RiString(var11);
    var3 = new RiString(ingred);
    var33 = new RiString(var111);
 
    var2 = var2.concat(var3);
    var2 = var2.concat(var22);
 
    final_string = final_string + " " + var2.text();
 
    title = var33.text();
 
  }
    int store1 = 8;
    int store2 = 8;
    PGraphics[] pgs = new PGraphics[store1];
    PGraphics[] pgs2 = new PGraphics[store2];
    if (count <= 16) {
      pgs[store1-1] = createGraphics(width,height);
      //PGraphics sourceImage;
      for (int i = 0; i < store1; i++) {
        pgs[i] = createGraphics(width,height);
        pgs2[i] = createGraphics(width, height);
 
        pgs[i].beginDraw();
        pgs2[i].beginDraw();
 
        pgs[i].noStroke();
        pgs2[i].noStroke();
 
        pgs[i].fill(int(random(0,255)),int(random(0,255)),int(random(0,255)), 30);
 
        pgs[i].ellipse(int(random(141, 291)), int(random(249, 399)), int(random(150, 300)), int(random(150, 300)));
 
        if (i == 0) {
          pgs2[i].fill(int(random(0,255)),int(random(0,255)),int(random(0,255)), 20);
          pgs2[i].ellipse(int(random(141, 291)), int(random(249, 399)), int(random(20, 50)), int(random(20, 50)));
          pgs[i].image(pgs2[i],0,0);
          pgs[i].endDraw();
        }
        else {
          pgs[i].image(pgs[i-1],0,0);
          pgs2[i].fill(int(random(0,255)),int(random(0,255)),int(random(0,255)), 20);
          pgs2[i].ellipse(int(random(141, 291)), int(random(249, 399)), int(random(20, 50)), int(random(20, 50)));
          pgs[i].image(pgs2[i],0,0);
          pgs[i].endDraw();
        }
      }
 
      maskImage = createGraphics(width, height);
      maskImage.beginDraw();
      maskImage.ellipse(width/2, height/2, 150, 150);
      maskImage.endDraw();
      pgs[store1-1].mask(maskImage);
      image(pgs[store1-1],0,0);
 
      noFill();
      strokeWeight(20);
      stroke(0);
      ellipse(width/2, height/2, 160, 160);
 
      strokeWeight(10);
      stroke(100,100,100);
      ellipse(width/2, height/2, 170, 170);
 
      textSize(18);
      textAlign(LEFT);
      text(title, 60, 65);
      textSize(12);
      text("Ingredients:", 60, 100);
      textSize(10);
      for (int i = 0; i < all_ingredients.size(); i++) {
        text(all_ingredients.get(i), 70, 110 + (i * 13), 400, 600);
      }
      textSize(12);
      final_string = final_string.substring(1);
      text(final_string, 60, 470, 312, 628);
    }
 
 //432 648
 
  if (count == 0) {
    background(255);
    textAlign(CENTER);
    textSize(32);
    text("Recipes for the Mad...", 250, 291);
    textSize(12);
    text("by chaine", 250, 321);
  }
 
  if (frameCount == 16) {
    exit();
  } else {
    pdf.nextPage(); 
  }
  count += 1;
}

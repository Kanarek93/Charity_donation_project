document.addEventListener("DOMContentLoaded", function() {

  /**
   * Form Select
   */
  class FormSelect {
    constructor($el) {
      this.$el = $el;
      this.options = [...$el.children];
      this.init();
    }

    init() {
      this.createElements();
      this.addEvents();
      this.$el.parentElement.removeChild(this.$el);
    }

    createElements() {
      // Input for value
      this.valueInput = document.createElement("input");
      this.valueInput.type = "text";
      this.valueInput.name = this.$el.name;

      // Dropdown container
      this.dropdown = document.createElement("div");
      this.dropdown.classList.add("dropdown");

      // List container
      this.ul = document.createElement("ul");

      // All list options
      this.options.forEach((el, i) => {
        const li = document.createElement("li");
        li.dataset.value = el.value;
        li.innerText = el.innerText;

        if (i === 0) {
          // First clickable option
          this.current = document.createElement("div");
          this.current.innerText = el.innerText;
          this.dropdown.appendChild(this.current);
          this.valueInput.value = el.value;
          li.classList.add("selected");
        }

        this.ul.appendChild(li);
      });

      this.dropdown.appendChild(this.ul);
      this.dropdown.appendChild(this.valueInput);
      this.$el.parentElement.appendChild(this.dropdown);
    }

    addEvents() {
      this.dropdown.addEventListener("click", e => {
        const target = e.target;
        this.dropdown.classList.toggle("selecting");

        // Save new value only when clicked on li
        if (target.tagName === "LI") {
          this.valueInput.value = target.dataset.value;
          this.current.innerText = target.innerText;
        }
      });
    }
  }
  document.querySelectorAll(".form-group--dropdown select").forEach(el => {
    new FormSelect(el);
  });

  /**
   * Hide elements when clicked on document
   */
  document.addEventListener("click", function(e) {
    const target = e.target;
    const tagName = target.tagName;

    if (target.classList.contains("dropdown")) return false;

    if (tagName === "LI" && target.parentElement.parentElement.classList.contains("dropdown")) {
      return false;
    }

    if (tagName === "DIV" && target.parentElement.classList.contains("dropdown")) {
      return false;
    }

    document.querySelectorAll(".form-group--dropdown .dropdown").forEach(el => {
      el.classList.remove("selecting");
    });
  });

  /**
   * Switching between form steps
   */
  class FormSteps {
    constructor(form) {
      this.$form = form;
      this.$next = form.querySelectorAll(".next-step");
      this.$prev = form.querySelectorAll(".prev-step");
      this.$step = form.querySelector(".form--steps-counter span");
      this.currentStep = 1;

      this.$stepInstructions = form.querySelectorAll(".form--steps-instructions p");
      const $stepForms = form.querySelectorAll("form > div");
      this.slides = [...this.$stepInstructions, ...$stepForms];

      this.init();
    }

    /**
     * Init all methods
     */
    init() {
      this.events();
      this.updateForm();
    }

    /**
     * All events that are happening in form
     */
    events() {
      // Next step
      this.$next.forEach(btn => {
        btn.addEventListener("click", e => {
          e.preventDefault();
          this.currentStep++;
          this.updateForm();
        });
      });

      // Previous step
      this.$prev.forEach(btn => {
        btn.addEventListener("click", e => {
          e.preventDefault();
          this.currentStep--;
          this.updateForm();
        });
      });

      // Form submit
      this.$form.querySelector("form").addEventListener("submit", e => this.submit(e));
    }

    /**
     * Update form front-end
     * Show next or previous section etc.
     */
    updateForm() {
      this.$step.innerText = this.currentStep;

      // TODO: Validation

      this.slides.forEach(slide => {
        slide.classList.remove("active");

        if (slide.dataset.step == this.currentStep) {
          slide.classList.add("active");
        }
      });

      this.$stepInstructions[0].parentElement.parentElement.hidden = this.currentStep >= 5;
      this.$step.parentElement.hidden = this.currentStep >= 5;

      // TODO: get data from inputs and show them in summary

        const summary = document.querySelectorAll(".summary li");

        const zipcode = document.querySelector("#zipCode");
        const bagsQ = document.querySelector("#bags");
        const categories = document.querySelectorAll("#categories:checked");
        let institut = document.querySelector("#fund:checked");
        const street = document.querySelector("#street");
        const city = document.querySelector("#city");
        const phone = document.querySelector("#phone")
        const pick = document.querySelector("#pickUp");
        const time = document.querySelector("#time");
        const com = document.querySelector("#comment");

        let firstLiText;
        let firstLiTextCategories ="";

        if (bagsQ.value <= 0) {
          firstLiText = "Co?? posz??o nie tak, nie chcesz odda?? ??adnych dar??w";
        }
        else if (bagsQ.value === 1) {
          firstLiText = "Oddajesz 1 worek w kt??rym s??";
        }
        else if (bagsQ.value > 1 && bagsQ.value < 5) {
          firstLiText = "Oddajesz " + bagsQ.value + " worki, w kt??rych s??";
        }
        else {
          firstLiText = "Oddajesz " + bagsQ.value + " work??w, w kt??rych s??";
        }

        if(categories.length > 0){
          categories.forEach(el => firstLiTextCategories = firstLiTextCategories + " " + el.title + ",");
          let newTextCategories = firstLiTextCategories.slice(0, -1);
          firstLiText = firstLiText + newTextCategories + ".";
        }
        else {
          firstLiText = "Nie oddawaj pustych work??w, zaznacz co jest w ??rodku!"
        }


        summary[0].lastElementChild.innerText = firstLiText;
        summary[1].lastElementChild.innerText = "Otrzyma je " + institut.title;
        summary[2].innerText = street.value;
        summary[3].innerText = zipcode.value;
        summary[4].innerText = city.value;
        summary[5].innerText = phone.value;
        summary[6].innerText = pick.value;
        summary[7].innerText = time.value;
        summary[8].innerText = com.value;


    }

  }
  const form = document.querySelector(".form--steps");
  if (form !== null) {
    new FormSteps(form);
  }

});

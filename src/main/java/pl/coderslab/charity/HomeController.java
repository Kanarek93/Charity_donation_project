package pl.coderslab.charity;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import pl.coderslab.charity.model.Category;
import pl.coderslab.charity.model.Institution;
import pl.coderslab.charity.service.CategoryService;
import pl.coderslab.charity.service.DonationService;
import pl.coderslab.charity.service.InstitutionService;

import java.util.List;


@Controller
@RequiredArgsConstructor
public class HomeController {

    private final InstitutionService is;
    private final DonationService ds;
    private final CategoryService cs;

    @RequestMapping("/")
    public String homeAction(Model model){
        return "index";
    }

    @ModelAttribute(name = "institutions")
    public List<Institution> institutionList(){
        return is.getAllInstitutions();
    }

    @ModelAttribute(name = "categories")
    public List<Category> categoryList(){return cs.getAllCategories();}

    @ModelAttribute(name = "donation")
    public Integer donationsQuantity(){return ds.getQuantityOfDonationsFromQuery();}

    @ModelAttribute(name = "bag")
    public Integer bagsQuantity(){return ds.getQuantityOfBags();}
}

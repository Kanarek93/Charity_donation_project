package pl.coderslab.charity.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.coderslab.charity.model.Donation;
import pl.coderslab.charity.model.DonationRepository;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class DonationService {

    private final DonationRepository dr;

    public List<Donation> getAllDonations(){
        return dr.findAll();
    }

    //liczenie powinno być tutaj czy w kontrolerze?
    public Integer getQuantityOfBags(){
        List<Donation> donations = getAllDonations();
        Integer sum = 0;
        for (Donation d : donations){
            sum += d.getQuantity();
        }
        return sum;
    }


    //która funkcja jest lepsza?
    public Integer getQuantityOfDonationsFromQuery(){
        return dr.countDonationsById();
    }

    public Integer getQuantityOfDonationsFromList(){
        return getAllDonations().size();
    }

}

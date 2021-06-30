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

    public Integer getQuantityOfBags(){
        return dr.countQuantity();
    }

    public Integer getQuantityOfDonations(){
        return dr.countDonationsById();
    }


}
